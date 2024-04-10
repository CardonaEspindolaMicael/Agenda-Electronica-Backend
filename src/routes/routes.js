import { Router } from "express";
import routerUser from "../components/user/user.routes.js";
import authRouter from "../services/auth/auth.routes.js";
import routerReports from "../services/reports/reports.routes.js";
import routerSalida from "../components/notaSalida/salida.routes.js";
import routerRol from "../components/rol/rol.routes.js";
import routerComunicado from "../components/comunicado/comunicado..routes.js";

const router = Router(); 
router.use('/comunicado',routerComunicado)
router.use('/usuario', routerUser); 
router.use('/rol', routerRol); 
router.use('/auth', authRouter);
router.use('/reportes',routerReports);
router.use('/notaSalida',routerSalida);

export default router ;


