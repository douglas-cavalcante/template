const connection = require("../database");

class ClientController {
    async getAllClients(req, res) {
        try {
            const clients = await connection.query(`
             select * from clients
            `)

            if (clients[1].rowCount === 0) {
                res.status(404).json({ messagem: "Nenhum cliente cadastrado" })
            } else {
                res.status(200).json(clients[0])
            }

        } catch (error) {
            console.log(error)
        }
    }

    async getClientById(req, res) {
        try {
            const clientId = req.params.id

            const clientIdExist = await connection.query(`
            select * from clients where id = ${clientId}
            `)

            if (clientIdExist[1].rowCount === 0) {
                res.status(404).json({ messagem: "Cliente não encontrado" })
            } else {
                res.status(200).json(clientIdExist[1].rows[0])
            }

        } catch (error) {
            console.log(error)
        }
    }

    async postClient(req, res) {

        try {
            const { name, email, cpf, contact } = req.body

            if (!name || !email || !cpf || !contact) {
                res.json({ messagem: "Campo nome, email, cpf e contato são obrigatórios" })
            }

            const emailExist = await connection.query(`select * from clients where email = '${email}'`)
            const cpfExist = await connection.query(`select * from clients where cpf = '${cpf}'`)

            if (emailExist[1].rowCount !== 0) {
                res.json({ messagem: "Email Ja está cadastrado" })
            }
            if (cpfExist[1].rowCount !== 0) {
                res.json({ messagem: "CPF Ja está cadastrado" })
            }

            await connection.query(`
            insert into clients (name, email, cpf, contact)
            values ('${name}','${email}','${cpf}','${contact}')`)

            res.status(201).json({ messagem: "Cliente cadastrado com sucesso!" })

        } catch (error) {
            console.log(error)
        }

    }

    async updateClient(req, res) {
        try {
            const { name, email, cpf, contact } = req.body
            const idToUpdate = req.params.id

            const clientExist = await connection.query(`
            select * from clients where id = ${idToUpdate}
        `)

            if (clientExist[1].rowCount === 0) {
                res.json({ messagem: "Cliente não encontrado!" })
            }

            await connection.query(`
            update clients set name = '${name || clientExist[1].rows[0].name}',
            email = '${email || clientExist[1].rows[0].email}',
            cpf = '${cpf || clientExist[1].rows[0].cpf}',
            contact = '${contact || clientExist[1].rows[0].contact}'
            where id = ${idToUpdate}
        `)

            res.status(200).json({ messagem: "Dados atualizados com sucesso!" })

        } catch (error) {
            res.status(500).json({
                messagem: "Não é possível atualizar o serviço"
            })
        }

    }

    async deleteClient(req, res) {
        try {
            const idToDelete = req.params.id

            const clientExist = await connection.query(`
            select * from clients where id = ${idToDelete}`)

            if (clientExist[1].rowCount === 0) {
                res.json({ messagem: "Cliente não encontrado!" })
            }

            await connection.query(`delete from clients where id = ${idToDelete}`)

            res.status(200).json({ messagem: "Cliente Deletado com sucesso!!" })

        } catch (error) {
            res.status(500).json({ message: "Não é possivel deletar o cliente" })
        }
    }

}

module.exports = new ClientController()