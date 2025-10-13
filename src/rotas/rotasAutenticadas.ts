import usuarioController from "../usuarios/usuario.controller.js";
import produtoController from "../produtos/produto.controller.js";
import carrinhoController from "../carrinho/carrinho.controller.js";

import { Router, Request, Response } from "express";

const rotasAutenticadas = Router();


rotasAutenticadas.post("/usuarios", usuarioController.adicionar);
rotasAutenticadas.get("/usuarios", usuarioController.listar);

rotasAutenticadas.post("/produtos", produtoController.adicionar);
rotasAutenticadas.get("/produtos", produtoController.listar);

rotasAutenticadas.post("/carrinhos", carrinhoController.adicionarItem);
rotasAutenticadas.get("/carrinhos", carrinhoController.listarItem);
rotasAutenticadas.delete("/carrinhos", carrinhoController.apagarCarrinho);

rotasAutenticadas.post("/removerItemDoCarrinho", carrinhoController.removerItem);
rotasAutenticadas.post("/atualizarQuantidadeDoItem", carrinhoController.atualizarQuantidade);


export default rotasAutenticadas;