import './config.js'
import { readDB } from "readDB.js"
import { writeDB } from "./writeDB.js"

export const update = (id) =>{
  
if (!id) {
    throw new Error("ID is required");
  }

  const db = readDB();

  const index = db.findIndex(item => item.id == id);

  if (index === -1) return null;

  for (let key in newData) {
    db[index][key] = encrypt(newData[key]);
  }

  writeDB(db);

  return readState(id);
}

