import { Router } from "express";
import { materiaController } from "./materia.controller.js";
const routerMateria=Router();

routerMateria.get('/:ciAlumno',materiaController.getDatosmateria);//materia que esta cursando un alumno por su ci 

routerMateria.get('/',materiaController.getMateria);

routerMateria.post('/',materiaController.createmateria);

routerMateria.delete('/:idMateria',materiaController.deletemateria);

routerMateria.put('/:idMateria',materiaController.actualizarMateria);

export default routerMateria;