import { UploadedFile } from "express-fileupload";
import { extname } from "path";

export function uploadWarriorImages(warriorName: string, portraitImage: UploadedFile, attackImage: UploadedFile): { portraitImagePath: string, attackImagePath: string } {
  const portraitImagePath = 'public/' + warriorName + '-portrait-image' + extname(portraitImage.name);
  const attackImagePath = 'public/' + warriorName + '-attack-image' + extname(attackImage.name);

  portraitImage.mv(portraitImagePath);
  attackImage.mv(attackImagePath);

  return { portraitImagePath, attackImagePath };
}

export function randomEnum<T>(anEnum: T): number {
  const enumValues = Object.keys(anEnum);
  const randomIndex = Math.floor(Math.random() * enumValues.length / 2);

  return randomIndex;
}