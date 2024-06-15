require('dotenv').config()

const express = require('express');
const routes = require('./routes');

require('./database');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.SERVER_PORT, () => {
    console.log("Aplicação online")
});