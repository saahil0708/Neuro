import express from 'express';
import cors from 'cors';
import authRoutes from './Routes/authRoutes.js';
import chatbotRoutes from './Routes/chatbotRoutes.js';

const app = express();

app.use(cors({
    origin: ['https://neuro-sync-chi.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatbotRoutes);

export default app;