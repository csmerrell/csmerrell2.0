import express from 'express';

const docsController = express.Router();

docsController.get('/BlockCarousel/*', (req, res) => {
    res.render(`docs/${req.path}`, { title: "Block Carousel - Documentation", layout: "centeredLayout" });
})

docsController.get('/TagFilterview/*', (req, res) => {
    res.render(`docs/${req.path}`, { title: "Tag Filterview - Documentation", layout: "centeredLayout" });
})

docsController.get('/ThemeSelector/*', (req, res) => {
    res.render(`docs/${req.path}`, { title: "Theme Selector - Documentation", layout: "centeredLayout" });
})

docsController.get('/', (req, res) => {
    res.render('docs/index', { title: "CSM - Documentation", layout: "centeredLayout" });
})

export default docsController;