'use client'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useEffect, useRef, useState } from 'react'
import useApi from '@/composable/api'
import Image from 'next/image'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ApoResponseType } from '@/utils/types'
export type UploadStatus = 'ready' | 'uploading' | 'done' | 'error' | 'cancelled';

export interface FileItem {
  id: string | undefined;
  file: File;
  progress: number;
  status: UploadStatus;
  error?: string | null;
  preview?: string | null;
  cancelToken?: null;
  response?: null | FileUploadResponseType[];
}
type FileUploadResponseType = ApoResponseType & {
  fileId: string;
  extension: string;
  mimetype: string;
}
interface Props {
  uploadUrl?: string
maxFileSize?: number 
allowedTypes?: string[]
setAttachmentId?: (id: string) => void
attachmentId?: string
onUploaded?: () => void
mode?: 'preview' | 'edit'
}
export function FileUpload ({
uploadUrl = '/attachments/upload-file', // server endpoint that accepts multipart/form-data
maxFileSize = 5 * 1024 * 1024, // 5 MB
allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
onUploaded = () => {},
mode = 'edit',
attachmentId,
setAttachmentId
}: Props) {
const [fileItem, setFileItem] = useState<FileItem | null>(null) // {file, id, progress, status, error, preview, cancelToken, response}
const api = useApi()


function uid() {
return Math.random().toString(36).slice(2, 10)
}


function validateFile(file: File) {
if (allowedTypes.length && !allowedTypes.includes(file.type)) {
return `Type not allowed: ${file.type || 'unknown'}`
}
if (file.size > maxFileSize) return `File is too large (${Math.round(file.size / 1024)} KB)`
return null
}


async function addFile(file: File) {
const error = validateFile(file)
const id = uid()
const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : null
const item: FileItem = {
id,
file,
progress: 0,
status: error ? 'error' : 'ready',
error,
preview,
cancelToken: null,
response: null,
}
setFileItem(item)
return item

}



async function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
if (e.target.files?.[0]){
  const item = await addFile(e.target.files[0])
uploadFile(item)
}
e.target.value = '' // reset so same file can be reselected
}

useEffect(()=>{
  if(attachmentId)
  api(`/attachments/file/${attachmentId}`,"GET", {config:{responseType: 'blob'}}).then(data=>{

  })
},[])


function uploadFile(item: FileItem) {
if (!item || item.status === 'uploading') return
// const source = axios.CancelToken.source()
const form = new FormData()
form.append('file', item.file)
setFileItem({ ...item, status: 'uploading', progress: 0, cancelToken: null })


api<FileUploadResponseType[]>(uploadUrl, 'POST', {
  data: form,
  config: {
headers: { 'Content-Type': 'multipart/form-data' },
onUploadProgress: (ev) => {
if (!ev.lengthComputable) return
const pct = Math.round( ev.total ? (ev.loaded * 100) / ev.total: 0)
setFileItem((x) => ({ ...x, progress: pct }) as FileItem)
},
cancelToken: undefined
}
})
.then((res) => {

setFileItem((x) => {
if (!x) return null;
const updated: FileItem = { ...x, status: 'done', progress: 100, response: res, cancelToken: null, id: 's' }
if (res && res?.length) {
  updated.id = res[0].id as string
  setAttachmentId && setAttachmentId?.(res[0].id)
}
return updated
})

})
.catch((err) => {

const message = err?.response?.data?.message || err.message || 'Upload failed'
setFileItem((x) => ({ ...x, status: 'error', error: message, cancelToken: null }) as FileItem)

})
}


function removeFile() {
setFileItem(null)
setAttachmentId && setAttachmentId('')
}



if(fileItem?.file && fileItem.status === 'uploading'){
  return (<div className=' relative flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 cursor-pointer overflow-hidden hover:shadow'>
    {fileItem.progress}%
  </div>)
}
else if(fileItem?.file && fileItem.status === 'done' && fileItem.preview){
  return (<div className=' relative flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 cursor-pointer overflow-hidden hover:shadow'>
    <Image src={fileItem.preview} fill alt='updaload Image' className='size-12 z-10'/>
      <XMarkIcon aria-hidden="true" onClick={removeFile} className="size-6 p-1  absolute top-1 right-1 z-20 text-black rounded-full shadow hover:border-gray-400" />
  </div>)
}
  else
  return (
    <label
                      htmlFor="file-upload" className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 cursor-pointer hover:shadow">
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <div>
                     
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={onInputChange} />
                    </div>
                   
                  </div>
                  
                </div>
              </label>
  )
}
