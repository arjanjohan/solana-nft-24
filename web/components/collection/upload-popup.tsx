'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface UploadPopupProps {
  show: boolean;
  onClose: () => void;
  onUpload: () => void;
}

export default function UploadPopup({
  show,
  onClose,
  onUpload,
}: UploadPopupProps) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file && name && category) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);
      formData.append('category', category);

      const response = await axios.post(
        'http://localhost:5000/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        onUpload();
        setFile(null);
        setName('');
        setCategory('');
        onClose();
      }
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Upload New Trait</h2>
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select Category</option>
            <option value="background">Background</option>
            <option value="shirt">Shirt</option>
            <option value="weapon">Weapon</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={handleUpload} className="btn btn-primary">
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
