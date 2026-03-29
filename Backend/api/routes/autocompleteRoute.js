import express from "express";
import { getAutocompleteSuggestion } from "../controllers/autocomplete.controller.js";

const router = express.Router();

// POST /api/autocomplete
router.post("/", getAutocompleteSuggestion);

export default router;
