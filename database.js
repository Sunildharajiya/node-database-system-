/* -------------------- IMPORT DEPENDENCIES -------------------- */

// Express framework for building API server
import express from "express";

// Import CRUD database functions
import { createState, readState, updateState, deleteState } from "./Functions/CRUD.js";


/* -------------------- SERVER CONFIG -------------------- */

// Create express app instance
const app = express();

// Server port
// You can access server at: http://localhost:10000
const port = 10000;

// Middleware to read JSON body from requests
app.use(express.json());


/* -------------------- API ROUTES -------------------- */

// Root route (check if server is running)
app.get("/", (req, res) => {
  res.send("Database is live");
});


/* -------------------- CREATE -------------------- */

// Create new record
app.post("/create", (req, res) => {

  // req.body contains JSON data sent by client
  const data = createState(req.body);

  // Send created data as response
  res.json(data);
});


/* -------------------- READ ALL -------------------- */

// Get all records
app.get("/read", (req, res) => {

  // readState() without id returns all records
  const data = readState();

  res.json(data);
});


/* -------------------- READ BY ID -------------------- */

// Get specific record by id
app.get("/read/:id", (req, res) => {

  const data = readState(req.params.id);

  if (!data) {
    return res.status(404).send("Not found");
  }

  res.json(data);
});


/* -------------------- UPDATE -------------------- */

// Update record by id
app.put("/update/:id", (req, res) => {

  const data = updateState(req.params.id, req.body);

  if (!data) {
    return res.status(404).send("Not found");
  }

  console.log("Update done");

  res.json(data);
});


/* -------------------- DELETE -------------------- */

// Delete record by id
app.delete("/delete/:id", (req, res) => {

  deleteState(req.params.id);

  res.send("Deleted");
});


/* -------------------- START SERVER -------------------- */

// Start server
app.listen(port, () => {
  console.log(`Node Database running on port ${port}`);
});