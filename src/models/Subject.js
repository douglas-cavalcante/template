const { Sequelize } = require("sequelize");
const connection = require("../database");

const Subject = connection.define("subjects", {
    name: {
        type: Sequelize.STRING
    }
})

module.exports = Subject
