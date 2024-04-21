import { Router } from "express";
import { comunicadoController } from "./comunicado.controller.js";
const routerComunicado=Router();

routerComunicado.get('/obtenerVistos/:ciUsuario',comunicadoController.getDatosComunicado);

routerComunicado.get('/:ciUsuario',comunicadoController.getDetalleComunicado);

routerComunicado.post('/',comunicadoController.createComunicado);

routerComunicado.delete('/:idrol',comunicadoController.deleteComunicado);

export default routerComunicado;