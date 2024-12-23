'use client';
import React, { useState } from 'react';
import axios from 'axios';

interface CVUploadFormProps {
  onUpload: (file: File) => void;
}

const CVUploadForm: React.FC<CVUploadFormProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setUploadStatus(null);
    } else {
      setSelectedFile(null);
      setUploadStatus('Chỉ được upload file PDF');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedFile) {
      setUploadStatus('Vui lòng chọn file PDF');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

      setUploading(true);
      const response = await axios.post('http://localhost:8000/upload-cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadStatus('Upload CV thành công!');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex items-center">
      <div className="p-6 bg-white rounded-lg shadow-md min-h-[calc(100%-100px)]">
        <h2 className="text-2xl text-center">Nộp CV</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>
          {uploadStatus && (
            <div
              className={`mb-4 p-2 rounded text-center ${
                uploadStatus.includes("thành công")
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {uploadStatus}
            </div>
          )}
          <button
            type="submit"
            disabled={!selectedFile || uploading}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {uploading ? "Đang tải..." : "Tải CV lên"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CVUploadForm;
