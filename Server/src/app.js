import express from 'express';
import cors from 'cors';
import authRoutes from './Routes/authRoutes.js';
import chatbotRoutes from './Routes/chatbotRoutes.js';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || ['http://localhost:5173', 'https://neuro-sync.vercel.app', 'https://neuro-backend.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatbotRoutes);

export default app;