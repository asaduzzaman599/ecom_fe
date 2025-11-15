'use client';

import useApi from "@/composable/api";
import { useEffect, useState } from "react";

type Props = {
  fileId?: string;
  file?: File
  className?: string; // ✅ allow className
};

export default function FilePreview({ fileId, className, file }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(file ? URL.createObjectURL(file) : null);
  const api = useApi();

  useEffect(() => {
    console.log(fileId)
    if (!fileId) return;

    let objectUrl: string;

    api(`/attachments/file/${fileId}`, "GET", {
      config: { responseType: "blob" },
    })
      .then((res) => {
        const blob = res as Blob;
        objectUrl = URL.createObjectURL(blob);
        setPreviewUrl(objectUrl);
      })
      .catch(() => {})
      
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [fileId]);

  if (!previewUrl) return null;

  return (
    <img
      src={previewUrl}
      alt="File Preview"
      className={className} // ✅ Apply className
    />
  );
}
