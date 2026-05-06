/* -------------------- WRITE DATABASE -------------------- */

// This function writes updated data to the database file
export function writeDB(data) {

  // Convert JavaScript object to formatted JSON
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}
