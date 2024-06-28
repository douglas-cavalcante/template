const express = require('express');
const routes = require('./routes');
const clientsRoutes = require('./routes/clients.routes');

require('./database');

const app = express();

app.use(express.json());
app.use('/clients', clientsRoutes);

app.listen(process.env.SERVER_PORT, () => {
    console.log("Aplicação online")
});