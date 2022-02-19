import React, {SyntheticEvent, useState} from "react";
import GoToHome from "../../components/App/GoToHome";
import ImageInput from "../../components/CreateWarrior/ImageInput";
import NameInput from "../../components/CreateWarrior/NameInput";
import StatInput from "../../components/CreateWarrior/StatInput";
import { getErrorMessage } from "../../utils/HelperFunctions";
import {WarriorToInsert} from '../../../../types/warrior';

import './CreateWarrior.css';

function CreateWarrior(){
//Images preview: https://www.kindacode.com/article/react-show-image-preview-before-uploading/
  const [name, setName] = useState("");
  const [portraitImage, setPortraitImage] = useState<File>();
  const [attackImage, setAttackImage] = useState<File>();
  const [strength, setStrength] = useState(1);
  const [defense, setDefense] = useState(1);
  const [agility, setAgility] = useState(1);
  const [resilience, setResilience] = useState(1);
  const [remainingPoints, setRemainingPoints] = useState(6);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePortraitImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPortraitImage(e.target.files[0]);
    }
  };

  const handleAttackImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttackImage(e.target.files[0]);
    }
  };

  const handleOnSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try{
      if(name.length === 0) throw new Error("Name is required");
      if(name.length > 20) throw new Error("Name must be maximum 20 characters");
      if(remainingPoints > 0) throw new Error("There are still points to spend!");

      const warrior: WarriorToInsert = {
        name,
        strength,
        agility,
        resilience,
        defense,
      }

      const formData = new FormData();
      formData.append('warrior', JSON.stringify(warrior));
      if(portraitImage instanceof File) formData.append('portraitImage', portraitImage, portraitImage.name);
      if(attackImage instanceof File) formData.append('attackImage', attackImage, attackImage.name);

      console.log(formData.entries());
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/warrior`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if(response.status >= 400) throw new Error(data.message);
      setSuccess(true);
      setError("");
    } catch(error){
      setError(getErrorMessage(error));
    }
  }

  return (
    <article className="create-warrior">
      <div className="container">
        <h1>Create Warrior</h1>
        <section className="images">
          <img id="portrait-image" src={portraitImage ?  URL.createObjectURL(portraitImage) : "/bandit.png"} alt="portrait" />
          <img id="attack-image" src={attackImage ?  URL.createObjectURL(attackImage) : "/bandit-attack.png"} alt="attack" />
        </section>
        <form onSubmit={handleOnSubmit}>
          <fieldset className="warrior-info">
            <legend>Info</legend>
            <NameInput name={name} setName={setName}/>
            <ImageInput label="Choose portrait image" name="portrait-image-input" changeImage={handlePortraitImageChange}/>
            <ImageInput label="Choose attack image" name="attack-image-input" changeImage={handleAttackImageChange}/>
          </fieldset>
          <fieldset className="warrior-stats">
            <legend>Statistics</legend>
            <small>(Remaining points: <span>{remainingPoints}</span>)</small>
            <StatInput label="Strength" name="strength" stat={strength} setStat={setStrength} remainingPoints={remainingPoints} setRemainingPoints={setRemainingPoints}/>
            <StatInput label="Defense" name="defense" stat={defense} setStat={setDefense} remainingPoints={remainingPoints} setRemainingPoints={setRemainingPoints}/>
            <StatInput label="Agility" name="agility" stat={agility} setStat={setAgility} remainingPoints={remainingPoints} setRemainingPoints={setRemainingPoints}/>
            <StatInput label="Resilience" name="resilience" stat={resilience} setStat={setResilience} remainingPoints={remainingPoints} setRemainingPoints={setRemainingPoints}/>
          </fieldset>
          <fieldset className="bottom-panel">
            <span className={success ? "success" : "error"}>{success ? "Warrior created" : error}</span>
            <input type="submit" value="Create" className="outline" />
          </fieldset>
        </form>
        <GoToHome />
      </div>
    </article>
  )
}

export default CreateWarrior;