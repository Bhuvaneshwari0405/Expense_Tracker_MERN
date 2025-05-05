import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-1/4 mb-6">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Profile Image or Placeholder */}
      {!image ? (
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-2 border-slate-300 flex items-center justify-center bg-slate-100 mb-2">
            <LuUser className="text-4xl text-slate-400" />
          </div>
        </div>
      ) : (
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-300 mb-2">
          <img
            src={previewUrl}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      )}

      {/* Buttons: Trash and Upload */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleRemoveImage}
          className="flex items-center text-red-500 text-sm hover:underline"
        >
          <LuTrash className="mr-1" />
          Remove
        </button>
        <button
          type="button"
          onClick={onChooseFile}
          className="flex items-center text-blue-500 text-sm hover:underline"
        >
          <LuUpload className="mr-1" />
          Upload
        </button>
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
