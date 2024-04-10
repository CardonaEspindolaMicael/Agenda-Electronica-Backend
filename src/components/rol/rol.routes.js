import { Router } from "express";
import { rolController } from "./rol.controller.js";
const routerRol=Router();

routerRol.get('/',rolController.getDatosRol);

routerRol.get('/:idrol',rolController.getDetalleRol);

routerRol.post('/',rolController.createRol);

routerRol.put('/:idrol',rolController.updateRol);

routerRol.delete('/:idrol',rolController.deleteRol);

export default routerRol;