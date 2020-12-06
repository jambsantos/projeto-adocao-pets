require('dotenv-safe').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(`${process.env.MONGODB_URL}`, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

let db = mongoose.connection;

db.on("error", console.log.bind(console, "connection error:"))
db.once("open", () => console.log("Conexão feita com sucesso."))

const anjos = require("./routes/anjosRoute");

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin", "X-Requested-With", "Content-Type", "Accept")
    next();
})

app.use('/anjos', anjos);

module.exports = app;
