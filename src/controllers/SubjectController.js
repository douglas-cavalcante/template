const Subject = require("../models/Subject")


class SubjectController {

    async create(request, response){
        const body = request.body
        const subject = await Subject.create(body)
        response.status(201).json(subject)
    }
}

module.exports = new SubjectController()