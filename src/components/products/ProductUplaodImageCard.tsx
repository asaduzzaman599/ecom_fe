import { useState } from "react";
import { FileUpload } from "../tailwindcss/FileUpload";

export default function ProductUploadImageCard(){
    const [attachmentId, setAttachmentId ] = useState<string>('')
    return(<>
        <FileUpload />
    </>)
}