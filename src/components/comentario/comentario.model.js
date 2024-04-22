import { pool } from "../../config/databaseConnection.js";


async function getDetalleComentario(idActividad) {
  const client = await pool.connect();
  try {
    const res = await pool.query("select * from comentario where id_actividad =  (SELECT id_actividad FROM ACTIVIDAD_USUARIO WHERE id = $1)", [
      idActividad,
    ]);
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
}

async function createComentario(RolsBody) {
  const {comentario,idActividad,ciUsuario}=RolsBody;
  const client = await pool.connect();
  try {
    const res = await pool.query(
      "CALL insertar_comentario($1,$2,$3)",[comentario,idActividad,ciUsuario]
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

export const comentarioModels = {
  getDetalleComentario,
  updateRol,
  createComentario,
  deleteRol,

};
