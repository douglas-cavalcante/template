const {Router} = require('express');
const SubjectController = require('./controllers/SubjectController');

const routes = new Router();

routes.post('/subjects', SubjectController.create)

module.exports = routes;
