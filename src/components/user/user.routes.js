import {Router} from "express"
import { postUsuario,patchContrasena, getUsuarios, actualizarUsuario, eliminarUsuario, excelToJson, excelToJsonPadres, patchContrasena2 ,getDatosPorRol} from "./user.controllers.js";
const routerUser = Router() ;
import multer from "multer";
import { checkAuth } from "../../middlewares/auth.js";
import { authRole } from "../../middlewares/auth_role.js";

const upload = multer({ dest: 'uploads/' }); 



 


routerUser.get('/' ,checkAuth,authRole(['administrador']),getUsuarios)
routerUser.put('/',checkAuth,actualizarUsuario)
routerUser.get('/obtenerdatosPorRol',checkAuth,getDatosPorRol)
routerUser.post('/registro',checkAuth,postUsuario)
routerUser.put('/cambiarClave/:ci',patchContrasena)
routerUser.put('/cambiarClaveAdmin/:ci',checkAuth,patchContrasena2)
routerUser.delete('/:ci',checkAuth,eliminarUsuario )
routerUser.post('/multiRegistro',checkAuth,upload.single('excel'),excelToJson)
routerUser.post('/registrarTutores',checkAuth,upload.single('excel'),excelToJsonPadres)


export default routerUser; 