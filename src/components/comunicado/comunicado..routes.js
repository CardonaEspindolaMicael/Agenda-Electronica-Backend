import { Router } from "express";
import { comunicadoController } from "./comunicado.controller.js";
const routerComunicado=Router();

routerComunicado.get('/obtenerVistos/',comunicadoController.getDatosComunicado);//No tocar

routerComunicado.get('/:ciUsuario',comunicadoController.getDetalleComunicado);//No tocar

routerComunicado.post('/',comunicadoController.createComunicado);//No tocar

routerComunicado.post('/:idrol',comunicadoController.deleteComunicado);

routerComunicado.delete('/:idDetalle',comunicadoController.ActualizarComunicadoVisto);


export default routerComunicado;