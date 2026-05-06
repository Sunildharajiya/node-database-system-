import path from "path";

export const DB_DIR = path.join(process.cwd(), "db");

export function getCollectionPath(name) {
  return path.join(DB_DIR, `${name}.json`);
}