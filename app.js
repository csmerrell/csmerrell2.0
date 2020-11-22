// Import all dependencies & middleware here
import express from 'express';
import exphbs from 'exphbs';
import bodyParser from 'body-parser';
import path from 'path';

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
    res.render('index', { title: "CSM Skill Samples", layout: "wideLayout" });
});

//Api controllers
import apiController from './api';
app.use('/api/', apiController);

//View controllers
import viewController from './controllers';
app.use('/', viewController);

//Static (js, lib, css, img, util, etc)
app.use('/static', express.static('static'));

app.set('port', (process.env.PORT || 5000));

var server = app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}!`);
});