const {Router} = require('express');
const SubjectController = require('./controllers/SubjectController');
const QuestionController = require('./controllers/QuestionController');

const routes = new Router();

routes.post('/subjects', SubjectController.create)
routes.get('/subjects',  SubjectController.findAll)

routes.get('/questions',  QuestionController.findAll)
routes.post('/questions',  QuestionController.create)

module.exports = routes;
