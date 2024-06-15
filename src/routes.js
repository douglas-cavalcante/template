const {Router} = require('express');
const SubjectController = require('./controllers/SubjectController');

const routes = new Router();

routes.post('/subjects', SubjectController.create)
routes.get('/subjects',  SubjectController.findAll)

module.exports = routes;
