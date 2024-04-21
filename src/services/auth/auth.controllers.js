import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 
import {obtenerTutoresPorSuCarnet, obtenerUsuarioPorSuCarnet, seLogeoPorPrimeraVez } from "../../components/user/user.models.js";

export const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY_TOKEN)
  } catch (error) {
    return null
  }

}
export const loginUser = async (req, res) => {
    let { ci, contrasena } = req.body;
    const result = await obtenerUsuarioPorSuCarnet(ci);
   
    if (!!!result) {
        loginTutor(req,res)
    }
    try {
      const filtrarContra=await seLogeoPorPrimeraVez(result.ci)
      if(filtrarContra.contrasena==String(contrasena)){
    
        return res.json({    
          message:[`Usuario nuevo por favor cambiar contraseña`],
          error:'ambigous',
          statusCode:403})
      } 
      const checkPassword = await bcrypt.compare(contrasena, result.contrasena);
      if (!checkPassword) {
        return res.json({    
          message:[`la contraseña no es valida`],
          error:'not found',
          statusCode:404})// Unauthorized
      }
      const token = jwt.sign(
        { carnet: result.ci,
          cargo: result.cargo },
        process.env.SECRET_KEY_TOKEN,
        {
          expiresIn: "48h",
        }
      );
      const userData={
        ci: result.ci,
        nombre:result.nombre,
        telefono:result.telefono, 
        correo:result.email, 
        idRol : result.id_rol, 
        cargo: result.cargo,
        sessionToken:token
        } 
        return res.json({
          message:['Usuario Autentificado'],
          error:'Sin errores',
          statusCode:200,
          data:userData
        })

    } catch (error) {
      return {    
        message:error,
        error:error,
        statusCode:500}; // Internal Server Error
    }
  };

  export const loginTutor = async (req, res) => {
    let { ci, contrasena } = req.body;
    const result = await obtenerTutoresPorSuCarnet(ci);
   
    if (!!!result) {
      return res.json({    
        message:[`El usuario con ci: ${ci} no esta registrado`],
        error:'not found',
        statusCode:404})// Not Found
    }
    try {

      if(String(contrasena)<=5){
    
        return res.json({    
          message:[`Cambiar contraseña con el admin`],
          error:'ambigous',
          statusCode:403})
      } 
      const checkPassword = await bcrypt.compare(contrasena, result.contrasena);
      if (!checkPassword) {
        return res.json({    
          message:[`la contraseña no es valida`],
          error:'not found',
          statusCode:404})// Unauthorized
      }
      const token = jwt.sign(
        { carnet: result.ci,
          cargo: result.cargo },
        process.env.SECRET_KEY_TOKEN,
        {
          expiresIn: "48h",
        }
      );
      const userData={
        ci: result.ci,
        nombre:result.nombre,
        telefono:result.telefono, 
        correo:result.email, 
        idRol : result?.id_rol, 
        cargo: result?.cargo,
        sessionToken:token
        } 
        return res.json({
          message:['Usuario Autentificado'],
          error:'Sin errores',
          statusCode:200,
          data:userData
        })

    } catch (error) {
      return {    
        message:error,
        error:error,
        statusCode:500}; // Internal Server Error
    }
  };