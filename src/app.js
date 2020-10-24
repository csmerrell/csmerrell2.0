// Import all dependencies & middleware here
import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import path from 'path';

//Routing and api controllers
import { 
    pageController 
} from './api';

// Init an Express App. 
const app = express();

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
    layoutsDir: __dirname + '/views/layouts',
}));

// Use your dependencies here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => { 
    res.render('index', {layout: 'main'});
});

app.use('/api/v1/page', pageController);
app.use('/static', express.static('static'));

// Start Server here
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});