import { Router } from "express";
import routerUser from "../components/user/user.routes.js";
import authRouter from "../services/auth/auth.routes.js";
import routerReports from "../services/reports/reports.routes.js";
import routerSalida from "../components/notaSalida/salida.routes.js";
import routerRol from "../components/rol/rol.routes.js";
import routerComunicado from "../components/comunicado/comunicado..routes.js";
import routerActividad from "../components/actividades/actividad.routes.js";
import routerMateria from "../components/materia/materia.routes.js";
import routerComentario from "../components/comentario/comentario.routes.js";

const router = Router(); 
//web
router.use('/comunicado',routerComunicado)
router.use('/materia',routerMateria)

//movil
router.use('/actividad',routerActividad)
router.use('/usuario', routerUser); 
router.use('/rol', routerRol); 
router.use('/auth', authRouter);
router.use('/reportes',routerReports);
router.use('/notaSalida',routerSalida);
router.use('/comentario',routerComentario)

export default router ;


