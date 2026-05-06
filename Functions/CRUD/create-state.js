import './config.js'
import { readDB } from "readDB.js"
import { writeDB } from "./writeDB.js"

/* -------------------- CREATE -------------------- */

// This function creates a new record in database
export function createState(data) {

  // Read current database
  const db = readDB();

  // Object to store encrypted fields
  const encryptedData = {};

  // Encrypt every field from incoming data
  for (let key in data) {
    encryptedData[key] = encrypt(data[key]);
  }

  // Create new item with unique id
  const newItem = {
    id: GenerateId(), // id is NOT encrypted
    ...encryptedData
  };

  // Add new item to database
  db.push(newItem);

  // Save updated database
  writeDB(db);

  return newItem;
}
