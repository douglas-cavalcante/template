const Subject = require("../models/Subject")


class SubjectController {

    async findAll(request, response) {
       const data = await Subject.findAll()
       response.json(data)
    }

    async create(request, response) {
        try {
            const body = request.body

            if (!body.name) {
                return response.status(400).json({ message: 'Nome é o obrigatório' })
            }

            const subject = await Subject.create(body)
            response.status(201).json(subject)
        } catch (error) {
            return response.status(500).json({message: 'Erro ao criar disciplina'})
        }
    }
}

module.exports = new SubjectController()