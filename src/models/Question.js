const { Sequelize } = require("sequelize");
const connection = require("../database");
const Subject = require("./Subject");

const Question = connection.define("questions", {
    description: {
        type: Sequelize.TEXT
    },
    item_a: {
        type: Sequelize.TEXT
    },
    item_b: {
        type: Sequelize.TEXT
    },
    item_c: {
        type: Sequelize.TEXT
    },
    item_d: {
        type: Sequelize.TEXT
    },
    item_e: {
        type: Sequelize.TEXT
    },
    correct_item: {
        type: Sequelize.ENUM,
        values: ['A', 'B', 'C', 'D', 'E']
    },
    subject_id: {
        type: Sequelize.INTEGER
    },
    amount: {
        type: Sequelize.INTEGER
    }
})

Question.belongsTo(Subject)

module.exports = Question
