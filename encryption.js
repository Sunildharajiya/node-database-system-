// Import crypto module for encryption
import crypto from "crypto";

// Import dotenv to access environment variables
import dotenv from "dotenv";

dotenv.config();

/* -------------------- CONFIGURATION -------------------- */

// Encryption algorithm
const algorithm = "aes-256-cbc";

// Secret key from .env file (must be 32 bytes for AES-256)
const secretKey = Buffer.from(process.env.SECRET_KEY, "hex");

// Initialization vector from .env (16 bytes required)
const iv = Buffer.from(process.env.IV, "hex");


/* -------------------- ENCRYPT FUNCTION -------------------- */

// Encrypt plain text
export function encrypt(text) {

  // Create cipher instance
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  // Convert UTF-8 text → encrypted HEX
  let encrypted = cipher.update(String(text), "utf8", "hex");

  // Final encryption block
  encrypted += cipher.final("hex");

  return encrypted;
}


/* -------------------- HEX CHECK FUNCTION -------------------- */

// Check if a string is hex format
function isHex(str) {
  return typeof str === "string" && /^[0-9a-fA-F]+$/.test(str);
}


/* -------------------- DECRYPT FUNCTION -------------------- */

// Decrypt encrypted hex text
export function decrypt(text) {

  // Skip decryption if text is not encrypted
  if (!isHex(text)) {
    return text;
  }

  // Create decipher instance
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

  // Convert HEX → UTF-8
  let decrypted = decipher.update(text, "hex", "utf8");

  // Final decryption block
  decrypted += decipher.final("utf8");

  return decrypted;
}