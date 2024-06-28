const {Router} = require('express')
const clientsController = require('../controllers/clientsController')
const clientsRoutes = new Router()

clientsRoutes.get('/', clientsController.getAllClients)
clientsRoutes.get('/:id', clientsController.getClientById)
clientsRoutes.post('/', clientsController.postClient)
clientsRoutes.put('/:id', clientsController.updateClient)
clientsRoutes.delete('/:id', clientsController.deleteClient)


module.exports = clientsRoutes;
