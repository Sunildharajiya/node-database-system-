# Schema System Documentation
-------

## Introduction

The Schema System is responsible for defining and validating the structure of documents inside the database system.

It acts as the rule engine of the database and ensures that stored data follows a consistent format before being written into cluster storage.

The schema layer contains two files:
`schema-core.js`
`validate.js`

--------
## Purpose of the Schema layer
- The Schema Layer is responsible for:
- Defining document structures
- Validating field types
- Enforcing required fields
- Managing unique fields
- Generating automatic IDs
- Handling password hashing
- Protecting data integrity


## Architecture Flow
```
Application
    ↓
Model Layer
    ↓
Schema Validation Layer
    ↓
CRUD Layer
    ↓
Cluster Storage
```
---------
# schema-core.js Documentation
--------
## schema-core.js contains:
the Schema class
the type system
reusable validation types
This file defines how schemas are structured inside the database system.

### class Definition
```js
export class Schema {
  constructor(definition) {
    this.definition = definition;
  }
}
```
## How It Works
The Schema class stores schema rules inside the definition property.
Example:
```js
const userSchema = new Schema({
  name: {
    type: "string",
    required: true
  }
});
```
Stored internally as:
```json
{
  name: {
    type: "string",
    required: true
  }
}
```

---------
## Type System
The type system provides reusable validators for different field types.

  | Type | Purpose |
  | --- | --- |
  |  string | Basic string validation |
  | email | Email format validation |
  | password | Password validation |
  | text | Long text(peragraph) validation |
  | id | ID validation (manual and auto) |
  
  ## Schema Rules
 -  `type` : Defines the field validation type.
 -  `required` : Ensures the field must exist.
 -  `unique` : Prevents duplicate values inside the collection.
 -  `auto` : Automatically generates values.
  ## Example schema 
  
  ```js
  const userSchema = new Schema({
  id: {
    type: "id",
    auto: true
  },

  name: {
    type: "string",
    required: true
  },

  email: {
    type: "email",
    required: true,
    unique: true
  },

  password: {
    type: "password",
    required: true
  }
});
```
---------
# validate.js Documentation
---------
`validate.js` is the validation engine of the database system.
It validates incoming data using schema definitions before the data is stored inside cluster files.

## Responsibilities
The validation handler performs:
- schema validation
- required field checking
- type validation
- unique field checking
- auto functions (Now id only)
- password hashing

# Why the Schema Layer Exists
Without schemas:
- invalid data could be stored
- duplicate values could exist
- passwords could remain unencrypted
- collection structure could become inconsistent
- The schema layer guarantees data consistency across the database system.

# Summary
The Schema Layer is the validation and rule engine of the database system.
It ensures that all data written into cluster storage follows a structured, secure, and validated format before persistence.