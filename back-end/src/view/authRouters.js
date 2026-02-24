const {Router} = require('express');
const {Login} = require("../model/authService")

const rota = Router()

rota.get("/", Login);
rota.post('/login', Login)


module.exports = rota;