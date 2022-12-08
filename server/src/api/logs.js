const { Router } = require("express");
const LogEntry = require("../models/LogEntry");

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const savedLogEntry = await logEntry.save();
    res.status(200).json(savedLogEntry);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
