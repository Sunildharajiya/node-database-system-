import fs from "fs";
import { getCollectionPath } from "./config.js";
import { ensureCollection } from "./ensure.js";

import { encrypt } from "../Encryption/encryption.js"
/* -------------------- WRITE DATABASE -------------------- */

export function writeDB(collection, data) {

  // Ensure collection exists
  ensureCollection(collection);

  const filePath = getCollectionPath(collection);
  const Encrypted = encrypt(JSON.stringify(data, null, 2))
  fs.writeFileSync(filePath, Encrypted);
}