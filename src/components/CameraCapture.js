"use client";
import React, { useState, useEffect } from "react";
import { Camera, UploadCloud, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function CameraCapture({ onUpload }) {
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (currentUrl) {
      onUpload(currentUrl);
    }
  }, [currentUrl, onUpload]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      uploadToCloudinary(file);
    }
  };

  const uploadToCloudinary = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      
      if (data.secure_url) {
        setCurrentUrl(data.secure_url);
        // Show success toast for exactly 1.5 seconds
        toast.success("Image uploaded successfully!", {
          duration: 1500, 
        });
      }
    } catch (err) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="relative w-40 h-40 bg-slate-50 rounded-full overflow-hidden border-4 border-white shadow-xl flex items-center justify-center">
        {preview ? (
          <img src={preview} className="w-full h-full object-cover" alt="Preview" />
        ) : (
          <div className="text-center">
            <Camera className="w-10 h-10 text-slate-200 mx-auto" />
            <p className="text-[10px] font-bold text-slate-300 uppercase mt-2">No Photo</p>
          </div>
        )}
        
        {isUploading && (
          <div className="absolute inset-0 bg-indigo-600/20 backdrop-blur-sm flex items-center justify-center">
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full max-w-[200px]">
        <label className="cursor-pointer bg-slate-900 text-white px-4 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
          {preview ? <RefreshCw className="w-3 h-3" /> : <Camera className="w-3 h-3" />}
          {preview ? "Change Photo" : "Take/Upload Photo"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}