import usuarioController from "../usuarios/usuario.controller.js";


import { Router, Request, Response } from "express";

const rotasNaoAutenticadas = Router();


rotasNaoAutenticadas.post("/usuarios", usuarioController.adicionar);
rotasNaoAutenticadas.post("/usuarios", usuarioController.login);

export default rotasNaoAutenticadas;