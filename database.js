 /* -------------------- IMPORT DEPENDENCIES -------------------- */

// Express framework for building API server
import express from "express";

// Import CRUD database functions
import { createState, readState, updateState, deleteState } from "./Functions/CRUD.js";


/* -------------------- SERVER CONFIG -------------------- */

// Create express app instance
const app = express();

// Use environment port or fallback to 10000
const port = process.env.PORT || 10000;

// Hide Express server header (basic security)
app.disable("x-powered-by");

// Middleware to read JSON body from requests
app.use(express.json({ limit: "10kb" }));


/* -------------------- ROOT ROUTE -------------------- */

// Check if server is running
app.get("/", (req, res) => {
  res.send("Database is live");
});


/* -------------------- CREATE -------------------- */

// Create new record
app.post("/create", (req, res) => {

  try {

    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body is required");
    }

    const data = createState(req.body);

    res.status(201).json(data);

  } catch (error) {
    res.status(500).send("Server error");
  }

});


/* -------------------- READ BY ID -------------------- */

// Get specific record
app.get("/read/:id", (req, res) => {

  try {

    const id = req.params.id;

    if (!id) {
      return res.status(400).send("ID is required");
    }

    const data = readState(id);

    if (!data) {
      return res.status(404).send("Record not found");
    }

    res.json(data);

  } catch (error) {
    res.status(500).send("Server error");
  }

});


/* -------------------- UPDATE -------------------- */

// Update record
app.put("/update/:id", (req, res) => {

  try {

    const id = req.params.id;

    if (!id) {
      return res.status(400).send("ID is required");
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Update data required");
    }

    const data = updateState(id, req.body);

    if (!data) {
      return res.status(404).send("Record not found");
    }

    res.json(data);

  } catch (error) {
    res.status(500).send("Server error");
  }

});


/* -------------------- DELETE -------------------- */

// Delete record
app.delete("/delete/:id", (req, res) => {

  try {

    const id = req.params.id;

    if (!id) {
      return res.status(400).send("ID is required");
    }

    const deleted = deleteState(id);

    if (!deleted) {
      return res.status(404).send("Record not found");
    }

    res.send("Deleted successfully");

  } catch (error) {
    res.status(500).send("Server error");
  }

});


/* -------------------- START SERVER -------------------- */

// Start server
app.listen(port, () => {
  console.log(`Node Database running on port ${port}`);
});