import React, { useState } from "react"

interface UploadFile {
  file: File | null
  data: string
}

interface HookResponse {
  error: string
  uploadedFile: UploadFile | null
  uploadedFiles: UploadFile[]
  onFileChange: ((e: React.ChangeEvent<HTMLInputElement>) => void)
  onFileDelete: ((index: number)  => void)
  onUploadClick: ((e: React.MouseEvent<HTMLInputElement>) => void) 
}

/**
 * ファイルアップロード用フック
 * 個数上限を指定することで、配列にアップロードしたファイルを詰めて返却する
 * @param sizeLimit サイズ上限（MB）
 * @param quantityLimit 個数上限
 * @returns 
 */
export const useUploadFile = (sizeLimit: number, quantityLimit?: number): HookResponse => {

  const [error, setError] = useState("");
  const [uploadedFile, setUploadedFile] = useState<UploadFile | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);

  const convertSize = (sizeLimit: number) => {
    return sizeLimit * 1024 * 1024;
  }

  const isSetQuantityLimit = (quantityLimit: number | undefined) => {
    return quantityLimit !== undefined && quantityLimit > 0
  }

  const onFileDelete = (deleteIndex: number) => {
    if (!isSetQuantityLimit(quantityLimit)) {
      return;
    }
    setUploadedFiles(uploadedFiles.filter((file, i) => (i !== deleteIndex)));
  }

  const onUploadClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setError("");
    if (isSetQuantityLimit(quantityLimit) && uploadedFiles.length === quantityLimit) {
      setError(`添付数上限（${quantityLimit} 個）を超えています。`);
      e.preventDefault();
      return;
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target!.files![0];
    if(!file) {
      return;
    }
    if (file.size > convertSize(sizeLimit)) {
      setError(`サイズ上限（${sizeLimit} MB）を超えています。`);
      return;
    }
    const reader = new FileReader();
    reader.onload = function(loadEvent) {
      const data = loadEvent.target!.result ? loadEvent.target!.result : "";
      if (typeof data === "string") {
        setUploadedFile({
          file: file,
          data: data
        });
      }
      if (isSetQuantityLimit(quantityLimit)) {
        setUploadedFiles([
          ...uploadedFiles,
          {
            file: file,
            data: data as string
          }
        ])
      }
    }
    reader.readAsDataURL(file);   
  }
  return {error, uploadedFile, uploadedFiles, onFileChange, onUploadClick, onFileDelete};
}