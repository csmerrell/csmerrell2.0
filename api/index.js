import express from 'express';
import testController from './test/test.controller.js';

const api = express.Router();

api.use('/v1/test', testController);

api.get('/', (req, res) => {
   res.json({ message: "CSM API Root Directory - To be developed" })
})

api.get('/v1', (req, res) => {
   res.json({ message: "CSM API Root Directory (v1) - To be developed" })
})

export default api