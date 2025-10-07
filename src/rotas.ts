import usuarioController from "./usuarios/usuario.controller.js";
import produtoController from "./produtos/produto.controller.js";
import carrinhoController from "./carrinho/carrinho.controller.js";

import { Router } from "express";


const rotas = Router();

rotas.post("/usuarios", usuarioController.adicionar);
rotas.get("/usuarios", usuarioController.listar);

rotas.post("/produtos", produtoController.adicionar);
rotas.get("/produtos", produtoController.listar);

rotas.post("/carrinhos", carrinhoController.adicionarItem);
rotas.get("/carrinhos", carrinhoController.listarItem);
rotas.delete("/carrinhos", carrinhoController.apagarCarrinho);

rotas.post("/removerItemDoCarrinho", carrinhoController.removerItem);
rotas.post("/atualizarQuantidadeDoItem", carrinhoController.atualizarQuantidade);


export default rotas;