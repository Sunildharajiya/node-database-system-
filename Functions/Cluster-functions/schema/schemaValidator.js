
import { generateId , types} from "./schema-core.js";
import { hashPass } from "../Encryption/bcrypt.js";

export async function validate(schema, data, collectionData) {
  const def = schema.definition;

  for (let key in def) {
    const rules = def[key];
    let value = data[key];

    // 🔹 Auto ID
    if (rules.auto && rules.type === "id") {
      value = generateId();
      data[key] = value;
    }

    // 🔹 Required
    if (rules.required && value === undefined) {
      throw new Error(`${key} is required`);
    }

    if (value !== undefined) {

      // 🔹 Type check
      if (!types[rules.type](value)) {
        throw new Error(`${key} invalid (${rules.type})`);
      }
      
      //password hasing

      if (rules.type === "password" && value) {
       data[key] = await hashPass(value);
     }

      // 🔹 Unique check
      if (rules.unique) {
        const exists = collectionData.some(item => item[key] === value);
        if (exists) {
          throw new Error(`${key} must be unique`);
        }
      }
    }
  }

  return data;
}