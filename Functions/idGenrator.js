// Function to generate a unique ID using date, time, milliseconds and random characters
export function GenerateId() {

  // Get current date and time
  const now = new Date();

  // Create date string in format: YYYYMMDD
  // Example: 20260305
  const date =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") + // Month starts from 0 so +1
    String(now.getDate()).padStart(2, "0");

  // Create time string in format: HHMMSS
  // Example: 224530 (22:45:30)
  const time =
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0");

  // Get milliseconds and ensure it is always 3 digits
  // Example: 007 or 123
  const ms = String(now.getMilliseconds()).padStart(3, "0");

  // Characters used for random part
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Generate random pattern: Letter + Number + Letter
  // Example: A4Z
  const random =
    chars[Math.floor(Math.random() * chars.length)] +
    Math.floor(Math.random() * 10) +
    chars[Math.floor(Math.random() * chars.length)];

  // Final ID structure
  // Example:
  // 20260305A4Z224530A4Z123A4Z
  return date + random + time + random + ms + random;
}