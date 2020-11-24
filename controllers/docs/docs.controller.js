import express from 'express';

const docsController = express.Router();

docsController.get('/*', (req, res) => {
    res.render(`docs/${req.path}`, { title: "Block Carousel - Documentation", layout: "centeredLayout" });
})

docsController.get('/TagFilterview', (req, res) => {
    res.render('docs/TagFilterview', { title: "API - Tag Filterview", layout: "centeredLayout" });
})

docsController.get('/ThemeSelector', (req, res) => {
    res.render('docs/ThemeSelector', { title: "API - Theme Selector", layout: "centeredLayout" });
})

docsController.get('/', (req, res) => {
    res.render('docs/index', { title: "CSM - Documentation", layout: "centeredLayout" });
})

export default docsController;