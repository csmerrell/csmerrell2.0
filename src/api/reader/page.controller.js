import express from 'express';
import { Chapter } from '../../data/model';

const pageController = express.Router();

/**
 * GET/
 */
pageController.get("/api/v1/page/", (req, res) => {
    res.json({
        text: "Page Success!"
    })
});

export default pageController;