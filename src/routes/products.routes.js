const {Router} = require('express')
const productsController = require('../controllers/productsController')
const productsRoutes = new Router()

productsRoutes.get('/', productsController.getAllProducts)
productsRoutes.get('/:id', productsController.getProductById)
productsRoutes.post('/', productsController.postProduct)
productsRoutes.put('/:id', productsController.updateProduct)
productsRoutes.delete('/:id', productsController.deleteProduct)

module.exports = productsRoutes
