import express from 'express';

const resumeController = express.Router();

resumeController.get('/*', (req, res) => {
    res.render(`resume/${req.path}`, { title: "CSM Resume", layout: "wideLayout" });
})

export default resumeController;