const Question = require("../models/Question")
const Subject = require("../models/Subject")

class QuestionController {

    async findAll(request, response) {
        // olhar paginacao const questions = await Question.findAll({ offset: 2, limit: 2 })
        const questions = await Question.findAll({
            include: {
                model: Subject
            }
        })
        response.json(questions)
    }

    async create(request, response) {
        try {
            const body = request.body

            /* Fazer validacao com yup */

            const question = await Question.create(body)

            response.status(201).json(question)

        } catch (error) {
            return response.status(500).json({ message: 'Erro ao criar disciplina' })
        }
    }
}

module.exports = new QuestionController()