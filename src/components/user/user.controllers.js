import {
  validarCorreosUnicos,
  cambiarcontrasena,
  constraseñaActual,
  validarUsuariosExistentes,
  obtenerUsuarios,
  updateUsuario,
  deleteUser,
  registrarMultiplesUsuarios,
  seLogeoPorPrimeraVez,
  registrarMultiplesTutores,
  obtenerUsuariosPorRol,
  obtenerTutores,
  cambiarcontrasenaTutor,
  registrarUsuariosTutor,
  registrarMultiplesProfesores,
  registrarUsuariosPro,
  registrarUsuariosAl
 
} from "./user.models.js";
import bcrypt from "bcrypt";
import XLSX from 'xlsx'


export const getUsuarios = async (req, res) => {
  try {
    const response = await obtenerUsuarios();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getTutores = async (req, res) => {
  try {
    const response = await obtenerTutores();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getDatosPorRol = async (req, res) => {

  try {
    const response = await obtenerUsuariosPorRol();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const postUsuarioPro = async (req, res) => {
  try {
    const {
      ci_profesor, 
      nombreA,
      apellidos, 
      correo,
      sexo,
      telefono,
      gradoA,
      paraleloA,
      materiaA
    } = req.body;
    if (await validarCorreosUnicos(correo)) {
      console.log(validarCorreosUnicos(correo));
      res.status(403).send("Correo ya existe");
      return;
    }

    await registrarUsuariosPro(
      ci_profesor,
      nombreA,
      apellidos,
      correo,
      sexo,
      telefono,
      gradoA,
      paraleloA,
      materiaA
    ).then(() => res.status(201).send("Usuario registrado con exito!"));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};


export const postUsuarioAl = async (req, res) => {
  try {
    const {
      ci, 
      nombre,
      apellidos, 
      correo,
      sexo,
      telefono,
      gradoA,
      paraleloA,
    } = req.body;
    if (await validarCorreosUnicos(correo)) {
      console.log(validarCorreosUnicos(correo));
      res.status(403).send("Correo ya existe");
      return;
    }

    await registrarUsuariosAl(
      ci, 
      nombre,
      apellidos, 
      correo,
      sexo,
      telefono,
      gradoA,
      paraleloA,
    ).then(() => res.status(201).send("Usuario registrado con exito!"));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
export const postUsuarioTutor = async (req, res) => {
  try {
    const {
      ci, 
      apellidos, 
      contrasena,
      telefono,
    } = req.body;
    let nombre = req.body.nombre;

    nombre = nombre?.toLowerCase().trim();
    if (await validarCorreosUnicos(correo)) {
      console.log(validarCorreosUnicos(correo));
      res.status(403).send("Correo ya existe");
      return;
    }

    await registrarUsuariosTutor(
      ci,
      nombre,
      apellidos,
      await encryptarContrasena(contrasena),
      telefono
    ).then(() => res.status(201).send("Usuario registrado con exito!"));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
export const actualizarUsuario = async (req, res) => {
  try {
    const {
      ci,
      nombre,
      apellidos,
      correo,
      sexo,
      imagen,
      telefono
    } = req.body;

    let name = nombre?.toLowerCase().trim();

    await updateUsuario({
      ci,
      nombre:name,
      apellidos,
      correo,
      sexo,
      imagen,
      telefono
      })

      res.status(201).send("Usuario actualizado con exito!");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const eliminarUsuario = async (req, res) => {
    const { ci } = req.params;
    try {
      const response = await deleteUser(ci);
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json(error);
    }
  };



export const patchContrasena = async (req, res) => {
  try {
    const {antiguacontrasena, nuevacontrasena } = req.body;
    const { ci } = req.params;

    if (!(await validarUsuariosExistentes(ci))) {
      res.status(403).send(`El usuario con el ci : ${ci} no existe  `);
      return;
    }
    const filtrarContra=await seLogeoPorPrimeraVez(ci)
    console.log(filtrarContra.contrasena==antiguacontrasena);
    if(filtrarContra.contrasena==antiguacontrasena){
      await cambiarcontrasena(ci, await encryptarContrasena(nuevacontrasena));
      res.status(200).send("La contrasena ha sido actualizada");
      return;
    }
    const match = await bcrypt.compare(
      antiguacontrasena,
      await constraseñaActual(ci)
    );
    if (match) {
      await cambiarcontrasena(ci, await encryptarContrasena(nuevacontrasena));
      res.status(200).send("La contrasena ha sido actualizada");
    } else {
      res.status(403).send("Las contrasenas no coinciden");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
export const patchContrasena2 = async (req, res) => {
  try {
    const {nuevaContrasena } = req.body;
   
    const { ci } = req.params;
      await cambiarcontrasena(ci, await encryptarContrasena(nuevaContrasena));
      res.status(200).send("La contrasena ha sido actualizada");

  } catch (error) {
    res.status(500).send(error);
  }
};

export const patchContrasena3 = async (req, res) => {
  try {
    const {nuevaContrasena } = req.body;
   
    const { ci } = req.params;
      await cambiarcontrasenaTutor(ci, await encryptarContrasena(nuevaContrasena));
      res.status(200).send("La contrasena ha sido actualizada");

  } catch (error) {
    res.status(500).send(error);
  }
};
export const encryptarContrasena = async (contrasena) => {
  const salt = await bcrypt.genSalt(5);
  const newHash = await bcrypt.hash(contrasena, salt);
  return newHash;
};

export const excelToJson= async(req,res)=>{
try {
const excel=XLSX.readFile(
  req.file.path
);
const nombreHoja=excel.SheetNames;
const usuarios=XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]])
const cantidadUser=excel.Sheets[nombreHoja[0]];
const numeroDeUsuarios= XLSX.utils.decode_range(cantidadUser['!ref']);
const respuesta =await registrarMultiplesUsuarios(usuarios,numeroDeUsuarios.e.r-2)
res.status(200).send(respuesta);
} catch (error) {
  res.status(500).send(error);
}

}

export const excelToJsonPadres= async(req,res)=>{
  try {
  const excel=XLSX.readFile(
    req.file.path
  );
  const nombreHoja=excel.SheetNames;
  const usuarios=XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]])
  const cantidadUser=excel.Sheets[nombreHoja[0]];
  const numeroDeUsuarios= XLSX.utils.decode_range(cantidadUser['!ref']);
  const respuesta =await registrarMultiplesTutores(usuarios,numeroDeUsuarios.e.r-2)
  res.status(200).send(respuesta);
  } catch (error) {
    res.status(500).send(error);
  }
  
  }

  export const excelToJsonProfesor= async(req,res)=>{
    try {
    const excel=XLSX.readFile(
      req.file.path
    );
    const nombreHoja=excel.SheetNames;
    const usuarios=XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]])
    const cantidadUser=excel.Sheets[nombreHoja[0]];
    const numeroDeUsuarios= XLSX.utils.decode_range(cantidadUser['!ref']);
    const respuesta =await registrarMultiplesProfesores(usuarios,numeroDeUsuarios.e.r-2)
    res.status(200).send(respuesta);
    } catch (error) {
      res.status(500).send(error);
    }
  }