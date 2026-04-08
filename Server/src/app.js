import express from 'express';
import cors from 'cors';
import authRoutes from './Routes/authRoutes.js';
import chatbotRoutes from './Routes/chatbotRoutes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatbotRoutes);

export default app;