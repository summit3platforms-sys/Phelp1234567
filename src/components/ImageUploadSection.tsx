"use client";

import React, { useState, useRef } from 'react';

type ImageUploadSectionProps = {
  initialValue: string | null;
};

export default function ImageUploadSection({ initialValue }: ImageUploadSectionProps) {
  const [value, setValue] = useState<string>(initialValue || '');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Please choose a file first.");
      return;
    }

    setIsUploading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas for compression/resizing
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Max dimensions (e.g. 1000px max width/height)
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 750;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to JPEG with 70% quality
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setValue(compressedDataUrl);
          setIsUploading(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset file input
          }
        } else {
          setError("Failed to process image.");
          setIsUploading(false);
        }
      };
      img.onerror = () => {
        setError("Invalid image file.");
        setIsUploading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      setError("Failed to read file.");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setValue('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // Helper to determine if the value is a base64 string
  const isBase64 = value.startsWith('data:');

  const inputStyle = { width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '1rem' };
  const buttonStyle = { padding: '0.6rem 1.2rem', background: '#0f172a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, display: 'inline-block' };

  return (
    <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: '#f8fafc' }}>
      {/* Hidden input to pass value back to form */}
      <input type="hidden" name="featuredImage" value={value} />

      {/* Preview Section */}
      {value && (
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem', fontWeight: 'bold' }}>Featured Image Preview:</p>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <img 
              src={value} 
              alt="Featured Image Preview" 
              style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'contain', border: '1px solid var(--border-color)', borderRadius: '4px', background: '#fff' }} 
            />
            <button 
              onClick={handleRemoveClick}
              style={{ padding: '0.4rem 0.8rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
            >
              Remove Image
            </button>
          </div>
        </div>
      )}

      {/* File Upload Section */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', color: '#0f172a' }}>
          Upload Photo:
        </label>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <input 
            type="file" 
            ref={fileInputRef}
            accept="image/*" 
            style={{ padding: '0.4rem', border: '1px solid var(--border-color)', borderRadius: '4px', background: '#fff', flex: 1, minWidth: '200px' }} 
          />
          <button 
            onClick={handleUploadClick}
            disabled={isUploading}
            style={buttonStyle}
          >
            {isUploading ? 'Uploading...' : 'Upload Photo'}
          </button>
        </div>
        {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.4rem', marginBottom: 0 }}>{error}</p>}
      </div>

      {/* Manual URL Input */}
      <div>
        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 'bold', fontSize: '0.85rem', color: '#475569' }}>
          Or enter Image URL/Path:
        </label>
        <input 
          type="text" 
          value={isBase64 ? '' : value}
          onChange={handleTextChange}
          placeholder="e.g. /bixolon-error-codes.jpg" 
          style={{ ...inputStyle, marginBottom: 0 }} 
        />
        {isBase64 && (
          <p style={{ color: '#0f766e', fontSize: '0.8rem', marginTop: '0.3rem', marginBottom: 0, fontWeight: 500 }}>
            ✓ Image is successfully uploaded and compressed client-side.
          </p>
        )}
      </div>
    </div>
  );
}
