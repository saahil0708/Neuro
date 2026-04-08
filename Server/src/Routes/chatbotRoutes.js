import express from 'express';
import { askChatbot } from '../Controllers/chatbotController.js';

const router = express.Router();

router.post('/ask', askChatbot);

export default router;
