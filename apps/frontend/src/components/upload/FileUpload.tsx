import React, { useState } from 'react';
import { Upload, X, FileText, CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface FileUploadProps {
  label?: string;
  onFileSelect?: (file: File) => void;
  accept?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ label, onFileSelect, accept = 'image/*,.pdf' }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      if (onFileSelect) onFileSelect(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (onFileSelect) onFileSelect(file);
    }
  };

  return (
    <div className="w-full space-y-1">
      {label && <label className="text-xs font-semibold text-txtPrimary">{label}</label>}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-borderClr rounded-2xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors text-center cursor-pointer"
      >
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        {selectedFile ? (
          <div className="flex items-center gap-3 bg-cardBg p-3 rounded-xl border border-borderClr shadow-xs text-xs">
            <FileText className="h-5 w-5 text-primary" />
            <div className="flex flex-col text-left">
              <span className="font-bold text-txtPrimary truncate max-w-xs">{selectedFile.name}</span>
              <span className="text-[10px] text-txtSecondary">{(selectedFile.size / 1024).toFixed(1)} KB</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
              }}
              className="p-1 rounded-md text-txtSecondary hover:text-danger"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="p-3 rounded-full bg-cardBg border border-borderClr text-txtSecondary mb-2">
              <Upload className="h-5 w-5" />
            </div>
            <p className="text-xs font-bold text-txtPrimary">Click to upload or drag & drop</p>
            <p className="text-[10px] text-txtSecondary mt-0.5">Supports PNG, JPG, WEBP, or PDF (max 10MB)</p>
          </>
        )}
      </div>
    </div>
  );
};
