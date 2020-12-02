import express from 'express';
import docsController from './docs/docs.controller.js';
import resumeController from './resume/resume.controller.js';

const controllers = express.Router();

controllers.use('/docs', docsController);
// controllers.use('/resume', resumeController);

export default controllers
