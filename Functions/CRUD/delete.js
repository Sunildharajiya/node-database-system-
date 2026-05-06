import './config.js'
import { readDB } from "readDB.js"
import { writeDB } from "./writeDB.js"


/* -------------------- DELETE -------------------- */

// This function deletes a record by id
export function deleteState(id) {

  if (!id) {
    throw new Error("ID is required");
  }

  const db = readDB();

  const newDB = db.filter(item => item.id != id);

  if (newDB.length === db.length) {
    return false; // nothing deleted
  }

  writeDB(newDB);

  return true;
}