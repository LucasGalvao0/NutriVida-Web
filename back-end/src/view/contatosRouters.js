const { Router } = require('express');
const { 
    GetAll, GetById, Erase, Post, Put, Responder, ExcluirTodas, ArquivarContato, DesarquivarContato} = require("../model/contatosService");

const rota = Router();

rota.get("/", GetAll);
rota.get("/:id", GetById);

rota.post("/", Post);

rota.put("/:id", Put); 

rota.put("/:id/responder", Responder);

rota.put("/:id/arquivar", ArquivarContato);  
rota.put("/:id/desarquivar", DesarquivarContato); 

rota.delete("/:id", Erase);

rota.delete("/", ExcluirTodas);

module.exports = rota;