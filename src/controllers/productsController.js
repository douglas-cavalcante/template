const connection = require("../database")

class ProductController {
    async getAllProducts(req, res) {
        try {
            const products = await connection.query(`
            select * from products`)

            if (products[1].rowCount === 0) {
                res.status(404).json({ messagem: "Nenhum produto Cadastrado!" })
            } else {
                res.status(200).json(products[0])
            }

        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(req, res) {
        try {
            const productId = req.params.id

            const productIdExist = await connection.query(`
            select p.name, p.amount, p.color, p.voltage, p.description, c.name as categories
            from products p
            inner join categories c 
            on p.category_id = c.id where p.id = ${productId}
            `)

            if (productIdExist[1].rowCount === 0) {
                res.status(404).json({ messagem: "Produto não encontrado" })
            } else {
                res.status(200).json(productIdExist[1].rows[0])
            }

        } catch (error) {
            console.log(error)
        }
    }

    async postProduct(req, res) {
        try {
            const { name, amount, color, voltage, description, category_id } = req.body

            if (!name || !category_id) {
                res.json({ messagem: "Campos nome e categoria do produto são obrigatórios" })
            }

            const categoryExist = await connection.query(`
            select * from categories where id = ${category_id}`)

            if (categoryExist[1].rowCount === 0) {
                res.status(404).json({ messagem: "Categoria inexistente" })
            }

            await connection.query(`
            insert into products (name, amount, color, voltage, description, category_id)
            values ('${name}', '${amount}', '${color}', ${voltage}, '${description}', ${category_id})`)

            res.status(201).json({ messagem: "Produto Cadastrado com sucesso!!" })

        } catch (error) {
            res.json({ messagem: "Problema ao cadastrar Produto!!" })
        }
    }

    async updateProduct(req, res) {
        try {
            const { name, amount, color, voltage, description, category_id } = req.body
            const idToUpdate = req.params.id

            const productExiste = await connection.query(`
            select * from products where id = ${idToUpdate}`)

            if (productExiste[1].rowCount === 0) {
                res.json({ messagem: "Producto não encontrado!" })
            }

            await connection.query(`
            update products set name = '${name || productExiste[1].rows[0].name}',
            amount = '${amount || productExiste[1].rows[0].amount}',
            color = '${color || productExiste[1].rows[0].color}',
            voltage = '${voltage || productExiste[1].rows[0].voltage}',
            description = '${description || productExiste[1].rows[0].description}',
            category_id = '${category_id || productExiste[1].rows[0].category_id}'
            where id = ${idToUpdate}`)

            res.status(200).json({ messagem: "Dados atualizados com sucesso!!" })

        } catch (error) {
            res.json({ messagem: "Problema para atualizar o produto!" })
        }
    }

    async deleteProduct(req, res) {
        try {
            const idToDelete = req.params.id

            const productExist = await connection.query(`
            select * from products where id = ${idToDelete}`)

            if (productExist[1].rowCount === 0) {
                res.json({ messgem: "Produto não encontrado!!" })
            }

            await connection.query(`delete from products where id = ${idToDelete}`)

            res.status(200).json({ messagem: "Produto deletado com sucesso!!" })
        } catch (error) {
            res.status(500).json({ messagem: "Problema ao deletar o produto!" })
        }
    }
}

module.exports = new ProductController()