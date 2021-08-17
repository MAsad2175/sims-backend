const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const authController = require('./controllers/authController');
const configurationController = require('./controllers/configurationController');

dotenv.config({path: './config/config.env'});
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
app.use(bodyParser.json());
app.use(cors ({
    origin: process.env.CORS_URL
}));
app.use('/sims', authController);
app.use('/config', configurationController);

let port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});
