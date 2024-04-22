import { Router } from "express";
import { comentarioController } from "./comentario.controller.js";
const routerComentario=Router();

routerComentario.get('/:idActividad',comentarioController.getDetalleComentario);

routerComentario.post('/',comentarioController.createComentario);

routerComentario.put('/:idrol',comentarioController.updateRol);

routerComentario.delete('/:idrol',comentarioController.deleteRol);

export default routerComentario;