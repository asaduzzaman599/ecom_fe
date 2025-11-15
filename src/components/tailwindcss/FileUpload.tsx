'use client'
import { useState, useId, forwardRef, useImperativeHandle } from 'react'
import Image from 'next/image'
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/solid'
import useApi from '@/composable/api'
import { ApiResponseType } from '@/utils/types'

export type UploadStatus = 'ready' | 'uploading' | 'done' | 'error'

interface FileUploadResponseType extends ApiResponseType {
  fileId: string
}

export interface FileUploadRef {
  validate: () => boolean
}

interface Props {
  uploadUrl?: string
  maxFileSize?: number
  allowedTypes?: string[]
  setAttachmentId?: (id: string) => void
  attachmentId?: string
  required?: boolean
}

export const FileUpload = forwardRef<FileUploadRef, Props>(function FileUpload(
  {
    uploadUrl = '/attachments/upload-file',
    maxFileSize = 5 * 1024 * 1024,
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    setAttachmentId,
    required = false
  },
  ref
) {
  const uniqueId = useId()
  const api = useApi()

  const [fileItem, setFileItem] = useState<{
    preview: string | null
    progress: number
    status: UploadStatus
    errorMsg?: string
  } | null>(null)

  const [showRequiredError, setShowRequiredError] = useState(false)

  // Allow parent to trigger validation
  useImperativeHandle(ref, () => ({
    validate: () => {
      if (required && !fileItem) {
        setShowRequiredError(true)
        return false
      }
      return true
    }
  }))

  function validateFile(file: File) {
    if (!file) return 'File required'
    if (allowedTypes.length && !allowedTypes.includes(file.type))
      return `Invalid file type`
    if (file.size > maxFileSize)
      return `File too large (${Math.round(file.size / 1024)} KB)`
    return null
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const error = validateFile(file)
    const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : null

    if (error) {
      setFileItem({ preview, progress: 0, status: 'error', errorMsg: error })
      setShowRequiredError(false)
      return
    }

    setFileItem({ preview, progress: 0, status: 'ready' })
    setShowRequiredError(false)
    upload(file)
    e.target.value = ''
  }

  function upload(file: File) {
    const form = new FormData()
    form.append('file', file)

    setFileItem((x) => x && { ...x, status: 'uploading', progress: 0 })

    api<FileUploadResponseType[]>(uploadUrl, 'POST', {
      data: form,
      config: {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (ev) => {
          if (!ev.total) return
          const pct = Math.round((ev.loaded * 100) / ev.total)
          setFileItem((x) => x && { ...x, progress: pct })
        }
      }
    })
      .then((res) => {
        if (res?.length && setAttachmentId) setAttachmentId(res[0].fileId)
        setFileItem((x) => x && ({ ...x, status: 'done', progress: 100 }))
      })
      .catch(() => {
        setFileItem((x) => x && ({ ...x, status: 'error', errorMsg: 'Upload failed' }))
      })
  }

  function remove() {
    setFileItem(null)
    setAttachmentId?.('')
  }

  return (
    <div className="space-y-1 w-full">
      <div className={`relative w-full aspect-square border rounded-lg border-dashed flex items-center justify-center bg-white cursor-pointer overflow-hidden 
        ${showRequiredError ? 'border-red-500' : 'border-gray-300'}`}>

        <label className="w-full h-full flex items-center justify-center" htmlFor={uniqueId}>
          {!fileItem && <PhotoIcon className="h-10 w-10 text-gray-400" />}

          {fileItem?.status === 'uploading' && (
            <span className="text-sm font-medium text-gray-700">{fileItem.progress}%</span>
          )}

          {fileItem?.status === 'done' && fileItem.preview && (
            <Image src={fileItem.preview} fill alt="Preview" className="object-cover" />
          )}

          <input id={uniqueId} type="file" className="sr-only" onChange={handleChange} />
        </label>

        {fileItem && (
          <XMarkIcon
            onClick={remove}
            className="absolute top-1 right-1 h-5 w-5 bg-white rounded-full p-1 shadow cursor-pointer hover:bg-gray-100"
          />
        )}
      </div>

      {showRequiredError && (
        <p className="text-xs text-red-500">File is required</p>
      )}

      {fileItem?.errorMsg && (
        <p className="text-xs text-red-500">{fileItem.errorMsg}</p>
      )}
    </div>
  )
})
