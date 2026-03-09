# Node.js Encrypted File Database API

A lightweight Node.js file-based database API with AES-256 encryption and full CRUD operations.
This project demonstrates how to build a simple backend database system using Express.js, File Storage, and Encryption.

---

## Features

- CRUD API (Create, Read, Update, Delete)
- File-based database using JSON
- AES-256-CBC encryption for stored data
- Custom unique ID generator
- Lightweight and easy to run
- Built using Express.js
- Beginner-friendly backend architecture

---

## Project Structure
```
project
│
├── server.js
│
├── Functions
│     ├── CRUD.js
│     └── idGenerator.js
│
├── encryption.js
│
├── states
│     └── main.json
│
├── .env
└── README.md
```


## Installation

Clone the repository:

```bash
git clone git@github.com:Sunildharajiya/node-database-system.git
```

Go to project directory:

```bash
cd node-databse-system
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a ".env" file in the project root.

```env
SECRET_KEY=your_secret_key_here
IV=your_initialization_vector_here
```
### Generate them using Node.js:

use vscode terminal if you are using windos or mac 

Generate secret key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Generate IV:
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```
---

Start Server
```bash
node server.js
```

Server will run at:

`http://localhost:10000`

---

# API Endpoints

| Method | Endpoint | Purpose | Body Required | Parameters |
|--------|----------|---------|---------------|------------|
| GET | `/` | Check if the API server is running | No | None |
| POST | `/create` | Create a new record in the database | Yes | None |
| GET | `/read/:id` | Retrieve a specific record by ID | No | `id` |
| PUT | `/update/:id` | Update an existing record | Yes | `id` |
| DELETE | `/delete/:id` | Delete a record from the database | No | `id` |

Request Body Examples

- Create Record
```js
{
  "name": "Gujarat",
  "capital": "Gandhinagar"
}
```
- Update Record
```js
{
  "capital": "Ahmedabad"
}
```
---

### Example API Requests

- Read Record Example

`GET /read/20260305A4Z224530A4Z123A4Z`

- Delete Record Example

DELETE 
`/delete/20260305A4Z224530A4Z123A4Z`

---

### Notes

- Every record automatically receives a unique "id".
- All fields except "id" are encrypted before being stored.
- Data is automatically decrypted when returned through the API.
- The API accepts request bodies in JSON format.
---

Encryption

This project uses:

`AES-256-CBC`

for encrypting database values before storing them.

Encrypted values are stored in the JSON file and decrypted automatically when reading data.

---

### Example Database File
```
[
 {
   "id": "20260305A4Z224530A4Z123A4Z",
   "name": "7f3c2b1a...",
   "capital": "a91c5d2e..."
 }
]
```
---

Technologies Used

- Node.js
- Express.js
- Crypto Module
- JSON File Database

---

Future Improvements

- Input validation
- Authentication (JWT)
- Database indexing
- Logging system
- Error handling middleware
- REST API documentation

---

### Author
sunil dhrajiya
---
