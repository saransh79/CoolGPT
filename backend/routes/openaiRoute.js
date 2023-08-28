import express from 'express';
import {summaryController, chatbotController, jsconverterController, scifiImageController, paragraphController, correctSpellingController } from '../controllers/openaiController.js';

const router= express.Router();

// routes
// Summary
router.post("/summary", summaryController);
router.post("/paragraph", paragraphController);
router.post("/chatbot", chatbotController);
router.post("/js-converter", jsconverterController);
router.post("/scifi-image", scifiImageController);
router.post("/edits", correctSpellingController);

export default router;