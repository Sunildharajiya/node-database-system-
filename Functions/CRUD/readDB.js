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