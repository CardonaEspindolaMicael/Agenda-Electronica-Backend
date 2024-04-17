import { Router } from "express";
import { actividadController } from "./actividad.controller.js";
const routerActividad=Router();


routerActividad.get('/obtenerMateriasYCursos/:ciProfesor',actividadController.getDatosPorMateriasYCurso);//DROPDOWN profesor para que elija aque curso y materia enviar a crear actividades

routerActividad.get('/obtenerActividadesPendientes/:ciAlumno/:materia',actividadController.getDetalleActividad);//para que le aparescan a los estudiantes las actividades pendientes por cada materia que aparecera en un dropdown necesita la materia del estudiante
routerActividad.get('/:ciProfesor',actividadController.getActividadesPorCI);//
routerActividad.post('/crearActividad',actividadController.createActividad); //crea la actividad
routerActividad.put('/dejarEnVisto/:ciAlumno',actividadController.actualizarVisto);//para actualizar el visto de una actividad


export default routerActividad;