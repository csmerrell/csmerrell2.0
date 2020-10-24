// Import all dependencies & middleware here
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import path from 'path';

//Routing and api controllers
import { 
    pageController 
} from './api';

// Init an Express App. 
const app = express();

// Use your dependencies here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const appController = express.Router();

appController.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.use('/', appController);
app.use('/api/v1/page', pageController);
app.use('/static', express.static('static'));

// Start Server here
app.listen(8080, () => {
    console.log('Server is running on port 8080!');
});