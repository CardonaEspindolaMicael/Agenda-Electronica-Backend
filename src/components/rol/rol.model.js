import { pool } from "../../config/databaseConnection.js";

async function getDatosRol() {
  const client = await pool.connect();
  try {
    const res = await pool.query("SELECT * FROM rol");
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
}

async function getDetalleRol(idUsuario) {
  const client = await pool.connect();
  try {
    const res = await pool.query("SELECT u.*,r.cargo FROM usuario as u  JOIN  rol as r on r.id=u.id_rol where ci=$1", [
      idUsuario,
    ]);
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
}

async function createRol(RolsBody) {
  const {id_Rol,descripcion_nota,total_Rol,ci_usuario,cantidad_detalleRol,arreglo_de_detalles_de_Rols}=RolsBody;
  const client = await pool.connect();
  try {
    const res = await pool.query(
      "SELECT * FROM crearRolydetalle($1,$2,$3,$4,$5,$6)",[ id_Rol,descripcion_nota,total_Rol,ci_usuario,cantidad_detalleRol,JSON.stringify(arreglo_de_detalles_de_Rols)]
    );
    client.release();
    return res;
  } catch (error) {
    client.release();
    return error;
  }
}

async function updateRol(idRol,RolsBody) {
  const {descripcion,total, fecha}=RolsBody;
  const client = await pool.connect();
  try {
    const res = pool.query(
      "UPDATE notaDeRol SET descripcion = $1, total=$2, fecha=$3 where id = $4",
      [descripcion,total,fecha,idRol]
    );
    client.release();
    return res;
  } catch (error) {
    client.release();
    return error;
  }
}



async function deleteRol(idRol) {
  const client = await pool.connect();
  try {
    const res = pool.query("DELETE FROM notaDeRol WHERE id = $1", [idRol]);
    client.release();
    return res;
  } catch (error) {
    client.release();
    return error;
  }
}

export const rolModels = {
  getDatosRol,
  getDetalleRol,
  updateRol,
  createRol,
  deleteRol,

};
