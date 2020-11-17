import express from 'express';

const testController = express.Router();

/**
 * GET/
 */
testController.get("/", (req, res) => {
    res.json({
        text: "Test Success!"
    })
});

export default testController;