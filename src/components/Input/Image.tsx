import React, { ChangeEvent, InputHTMLAttributes, useRef } from "react";
import RippleEffect from "../Ripple";
import DocUploadIcon from "../../assets/svgs/document-upload.svg";
import toast from "react-hot-toast";
import { TValidatorError } from "../../@types";
import { baseURL } from "../../lib/axiosInstance";

type ImageInputProps = {
  label: string;
  image: File | string | null;
  onSelectImage: (file: File | null) => void;
  error?: TValidatorError | null;
  maxSizeMB?: number;
} & InputHTMLAttributes<HTMLInputElement>;

export const ImageInput: React.FC<ImageInputProps> = (props) => {
  const {
    label,
    image,
    error,
    onSelectImage,
    maxSizeMB = 1,
    ...inputProps
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes
      if (file.size > maxSizeBytes) {
        toast.error(
          `File size exceeds ${maxSizeMB}MB. Please select a smaller file.`
        );
        onSelectImage(null);
        return;
      }

      onSelectImage(file);
    } else {
      onSelectImage(null);
    }
  };

  const handleSelectClick = () => {
    inputRef.current?.click(); // Programmatically trigger the hidden input
  };

  return (
    <div>
      {label && (
        <label
          className="text-[14px] leading-[17.5px] font-normal block mb-2"
          htmlFor={inputProps.id}
        >
          {label}
        </label>
      )}

      <RippleEffect
        className="bg-[#EFEFEF80] rounded-[8px] flex h-[144px] flex-col justify-center items-center w-full cursor-pointer"
        onClick={handleSelectClick}
      >
        {image ? (
          <img
            src={
              typeof image === "string"
                ? `${baseURL}/${image}`
                : URL.createObjectURL(image)
            }
            alt="Selected image"
            className="object-cover h-full w-full"
          />
        ) : (
          <>
            <div className="flex flex-row gap-1 items-center">
              <DocUploadIcon />
              <p className="font-medium text-[16px] leading-[19.5px] text-[#000000B2]">
                Upload Image
              </p>
            </div>

            <p className="text-[12px] leading-[22px] text-[#00000080]">
              PNG & JPG image not more than 1mb
            </p>
          </>
        )}
      </RippleEffect>

      {error && (
        <p className="text-danger text-[12px] font-semibold leading-[15px] my-2">
          {typeof error === "string" && error}
        </p>
      )}

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleImageChange}
        title={label}
      />
    </div>
  );
};
