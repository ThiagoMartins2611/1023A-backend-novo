import usuarioController from "../usuarios/usuario.controller.js";
import produtoController from "../produtos/produto.controller.js";
import carrinhoController from "../carrinho/carrinho.controller.js";

import { Router, Request, Response } from "express";

const rotasNaoAutenticadas = Router();


rotasNaoAutenticadas.post("/usuarios", usuarioController.adicionar);
rotasNaoAutenticadas.post("/usuarios", usuarioController.login);

export default rotasNaoAutenticadas;