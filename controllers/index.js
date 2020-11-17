import express from 'express';
import docsController from './docs/docs.controller.js';

const controllers = express.Router();

controllers.use('/docs', docsController);

export default controllers
