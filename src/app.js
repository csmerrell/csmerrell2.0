// Import all dependencies & middleware here
import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import path from 'path';

//Api controllers
import { 
    pageController 
} from './api';

// Init an Express App. 
const app = express();

app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'centeredLayout',
    layoutsDir: __dirname + '/views/layouts',
}));
app.set('view engine', 'hbs');

// Use your dependencies here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => { 
    res.render('index', { title: "CSM Skill Samples", layout: "borderlessLayout" });
});
app.get('/samples', (req, res) => { 
    res.render('samples/index');
});
app.get('/about', (req, res) => { 
    res.render('about/index');
});
app.get('/storytelling', (req, res) => { 
    res.render('storytelling/index');
});

app.use('/api/v1/page', pageController);
app.use('/static', express.static('static'));
app.use('/favicon.ico', express.static('static/img/favicon.ico'));

// Start Server here
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});