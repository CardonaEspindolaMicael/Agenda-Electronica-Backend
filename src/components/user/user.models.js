import { pool } from "../../config/databaseConnection.js";

export const obtenerUsuarios = async () => {
  const client = await pool.connect();
  try {
    const response = await pool.query(
      "SELECT u.ci,u.nombre,u.apellidos,u.telefono,c.grado,c.paralelo from usuario as u   JOIN registro  as r on u.ci=r.ci_estudiante JOIN CURSO as c on r.id_curso=c.id;"
    );
    client.release();
    return response?.rows
    
  } catch (error) {
    console.log(error);
    client.release();
    return error;
  }
};

export const obtenerTutores = async () => {
  const client = await pool.connect();
  try {
    const response = await pool.query(
      "SELECT ci,nombre,apellidos,telefono from tutor"
    );
    client.release();
    return response?.rows;
  } catch (error) {
    console.log(error);
    client.release();
    return error;
  }
};

export const obtenerUsuariosPorRol = async () => {
  const client = await pool.connect();
  try {
    const response = await pool.query(
      "SELECT u.ci,u.nombre,u.apellidos,u.telefono from usuario as u JOIN rol on u.id_rol=rol.id where cargo='profesor' "
    );
    client.release();
    return response?.rows;
  } catch (error) {
    console.log(error);
    client.release();
    return error;
  }
};


export const registrarUsuarios = async (
  ci,
  nombre,
  apellidos,
  correo,
  sexo,
  contrasena,
  telefono,
  id_rol
) => {
  const client = await pool.connect();
  console.log(apellidos)

  const res = await pool.query(
    "INSERT INTO USUARIO(ci, nombre, apellidos, correo, sexo, contrasena,telefono,id_rol) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      ci,
      nombre,
      apellidos,
      correo,
      sexo,
      contrasena,
      telefono,
      id_rol
    ]
  );

  client.release();

  return res;
};
export const registrarUsuariosTutor = async (
  ci,
  nombre,
  apellidos,
  contrasena,
  telefono,
) => {
  const client = await pool.connect();
  console.log(apellidos)

  const res = await pool.query(
    "INSERT INTO tutor(ci, nombre, apellidos,contrasena,telefono) VALUES($1, $2, $3, $4, $5)",
    [
      ci,
      nombre,
      apellidos,
      contrasena,
      telefono
    ]
  );

  client.release();

  return res;
};
export const updateUsuario = async (User) => {
  const {
    ci,
    nombre,
    apellidos,
    correo,
    sexo,
    imagen,
    telefono
  } = User;

  const client = await pool.connect();
  try {
    const response = await pool.query(
      "UPDATE USUARIO SET ci = $1 , nombre = $2, apellidos = $3,correo = $4, sexo = $5, imagen = $6, telefono = $7 where ci = $8",
      [ ci,
        nombre,
        apellidos,
        correo,
        sexo,
        imagen,
        telefono,
        ci]
    );
    client.release();
    return response;
  } catch (error) {
    client.release();
    return error;
  }
};

export const deleteUser = async (ci) => {
    const client = await pool.connect(); 
    const existeUsuario=await validarUsuariosExistentes(ci);

    try {
      if (!!!existeUsuario){
        return {
          "message":`Error el usuario con ci ${ci} no existe`
        };
      }
        const res = await pool.query('DELETE FROM USUARIO WHERE ci = $1',[ci]);
        client.release();
        return {
          "message":`usuario eliminado`
        }; ; 
    } catch (error) {
        client.release()  ; 
        console.log(error);
        return error
    }

}

export const validarCorreosUnicos = async (correo) => {
  try {
    const client = await pool.connect();
    const res = await pool.query("SELECT ci FROM usuario WHERE correo=$1", [
      correo,
    ]);
    client.release();
    return res.rows.length> 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const cambiarcontrasena = async (ci, nuevacontrasena) => {
  const client = await pool.connect();
  const res = await pool.query("UPDATE USUARIO SET contrasena=$1 WHERE ci=$2", [
    nuevacontrasena,
    ci,
  ]);
  client.release();
  return res;
};

export const cambiarcontrasenaTutor = async (ci, nuevacontrasena) => {
  const client = await pool.connect();
  const res = await pool.query("UPDATE TUTOR SET contrasena=$1 WHERE ci=$2", [
    nuevacontrasena,
    ci,
  ]);
  client.release();
  return res;
};

export const constraseñaActual = async (ci) => {
  const client = await pool.connect();
  const resp = await pool.query("Select contrasena from usuario where ci=$1", [
    ci,
  ]);
  client.release();
  return resp.rows[0].contrasena;
};

export const validarUsuariosExistentes = async (ci) => {
  try {
    const client = await pool.connect();
    const res = await pool.query("SELECT ci FROM usuario WHERE ci=$1", [ci]);
    client.release();
    return res.rows.length > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const obtenerUsuarioPorCarnetDeIdentidad = async (ci) => {
  try {
    const client = await pool.connect();
    const res = await pool.query("SELECT * FROM usuario WHERE ci=$1", [ci]);
    client.release();
    return res.rows;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const obtenerUsuarioPorSuCarnet = async (nombre) => {
  const client = await pool.connect();
  try {
  
    const res = await pool.query(
      "SELECT usuario.*, rol.cargo from usuario JOIN rol on usuario.id_rol=rol.id WHERE usuario.ci=$1",
      [nombre]);
    client.release();
    return res.rows[0];
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const seLogeoPorPrimeraVez=async(ci)=>{
  const client = await pool.connect();
  try {
  
    const res = await pool.query(
      "SELECT contrasena from usuario WHERE usuario.ci=$1",
      [ci]);
    client.release();
    return res.rows[0];
  } catch (error) {
    console.error(error);
    return error;
  }
}


export const registrarMultiplesUsuarios= async (usuarios,cantUser)=>{
  const client = await pool.connect();
try {
  const res= await pool.query("SELECT * from insertar_multiples_estudiantes($1)",[JSON.stringify(usuarios)])
  client.release();
  return {
    "message":"Estudiantesregistrados con exito",
    "registrados":cantUser
  }
} catch (error) {
  client.release();
  return error
}


}

export const registrarMultiplesProfesores= async (usuarios,cantUser)=>{
  const client = await pool.connect();
try {
  console.log(JSON.stringify(usuarios))
  const res= await pool.query("SELECT * from insertar_multiples_profesores($1)",[JSON.stringify(usuarios)])
  
  client.release();
  return {
    "message":"Profesores registrados con exito",
    "registrados":cantUser
  }
} catch (error) {
  client.release();
  return error
}


}

export const registrarMultiplesTutores= async (usuarios,cantUser)=>{
  const client = await pool.connect();
try {
  const res= await pool.query("SELECT * from insertar_multiples_tutores($1)",[JSON.stringify(usuarios)])
  client.release();
  return {
    "message":"tutores registrados con exito",
    "registrados":cantUser
  }
} catch (error) {
  client.release();
  return error
}


}