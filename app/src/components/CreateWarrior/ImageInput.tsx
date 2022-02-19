import React from "react";

interface ImageInputProps{
  label: string;
  name: string;
  changeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function ImageInput({label, name, changeImage}: ImageInputProps){
  return (
    <label className="image" htmlFor={name}>
      {label}
      <input 
        accept="/image/*"
        type="file" 
        name={name} 
        id={name}
        onChange={changeImage}
        />
    </label>
  )
}

export default ImageInput;