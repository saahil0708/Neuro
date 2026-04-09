import app from '../src/app.js';
import connectDB from '../src/Config/DB/Db.js';
import config from '../src/Config/Configs.js';

// Connect Database
connectDB();

export default app;
