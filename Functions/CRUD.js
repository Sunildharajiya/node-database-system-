// File system module for reading/writing files
import fs from "fs";

// Path module for creating correct file paths
import path from "path";

// Database file location
// process.cwd() = current working directory of project
const DB_FILE = path.join(process.cwd(), "states", "main.json");

// Import custom ID generator
import { GenerateId } from "./idGenrator.js";

// Import encryption and decryption functions
import { encrypt, decrypt } from "../encryption.js";


/* -------------------- READ DATABASE -------------------- */

// This function reads the database file
export function readDB() {

  // Get the directory path where the DB file should exist
  const dir = path.dirname(DB_FILE);

  // If directory does not exist, create it
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // If database file does not exist, create it with an empty array
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
  }

  // Read the database file
  const data = fs.readFileSync(DB_FILE, "utf8");

  // Convert JSON string to JavaScript object
  return JSON.parse(data);
}


/* -------------------- WRITE DATABASE -------------------- */

// This function writes updated data to the database file
export function writeDB(data) {

  // Convert JavaScript object to formatted JSON
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}


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


/* -------------------- READ -------------------- */

// This function reads data from database
// If id is provided → return specific record
// If id is not provided → return all records
export function readState(id) {

  const db = readDB();

  // If no id is provided return all records
  if (!id) {

    // Decrypt all fields except id
    return db.map(item => {
      const decrypted = { id: item.id };

      for (let key in item) {
        if (key !== "id") {
          decrypted[key] = decrypt(item[key]);
        }
      }

      return decrypted;
    });

  }

  // Find record by id
  const item = db.find(item => item.id == id);

  // If record not found return null
  if (!item) return null;

  // Decrypt the record
  const decrypted = { id: item.id };

  for (let key in item) {
    if (key !== "id") {
      decrypted[key] = decrypt(item[key]);
    }
  }

  return decrypted;
}


/* -------------------- UPDATE -------------------- */

// This function updates an existing record
export function updateState(id, newData) {

  // Read database
  const db = readDB();

  // Find index of record to update
  const index = db.findIndex(item => item.id == id);

  // If record not found return null
  if (index === -1) return null;

  // Encrypt updated fields before saving
  for (let key in newData) {
    db[index][key] = encrypt(newData[key]);
  }

  // Save updated database
  writeDB(db);

  // Return decrypted updated record
  return readState(id);
}


/* -------------------- DELETE -------------------- */

// This function deletes a record by id
export function deleteState(id) {

  // Read database
  const db = readDB();

  // Filter out the record that should be deleted
  const newDB = db.filter(item => item.id != id);

  // Save updated database
  writeDB(newDB);

  return true;
}