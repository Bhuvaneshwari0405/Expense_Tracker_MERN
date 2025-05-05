import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ label, type, placeholder, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-4">
            <label className="text-[13px] text-slate-800 block mb-1">
                {label}
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
                <input 
                    type={type === "password" ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full bg-transparent outline-none text-sm text-gray-700"
                />
                {type === "password" && (
                    showPassword ? (
                        <FaRegEyeSlash 
                            size={18}
                            className="text-gray-500 cursor-pointer ml-2" 
                            onClick={toggleShowPassword}
                        />
                    ) : (
                        <FaRegEye 
                            size={18}
                            className="text-gray-500 cursor-pointer ml-2" 
                            onClick={toggleShowPassword}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Input;
