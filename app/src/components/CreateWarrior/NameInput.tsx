import React from "react";

interface NameInputProps{
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

function NameInput({name, setName}: NameInputProps){

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  return (
    <label htmlFor="name" className="name">
    Name:
    <input type="text" name="name" id="name" onChange={handleOnChange}/>
  </label>
  )
}

export default NameInput;