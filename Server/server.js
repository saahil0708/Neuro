import app from './src/app.js';
import config from './src/Config/Configs.js';
import connectDB from './src/Config/DB/Db.js';

const PORT = config.PORT;

// Connect Database
connectDB();

app.get("/", async function(req, res) {
    res.send("This is the Server URL!");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});