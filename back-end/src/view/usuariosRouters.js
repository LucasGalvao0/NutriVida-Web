
const { Router } = require('express'); 
const { GetAll, GetById , Erase , Post, Put, RedefinirSenha, SolicitarResetSenha } = require("../model/usuariosService");

const rota = Router();

rota.get("/", GetAll);
rota.get("/:id", GetById);

rota.post("/", Post);
rota.put("/:id", Put);
rota.delete("/:id", Erase);
rota.post("/solicitar-reset", SolicitarResetSenha);
rota.post("/redefinir-senha", RedefinirSenha);

module.exports = rota;