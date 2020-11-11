// Import all dependencies & middleware here
import express from 'express';
import exphbs from 'exphbs';
import bodyParser from 'body-parser';
import path from 'path';

//Api controllers
import { 
    pageController 
} from './api';

// Init an Express App. 
const app = express();

app.engine('hbs', exphbs.create({
    extname: '.hbs',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts'
}));
app.locals.layout = 'centeredLayout';

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

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