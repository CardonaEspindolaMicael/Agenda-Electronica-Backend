import { pool } from "../../config/databaseConnection.js";

async function getDatosComunicado(ci_usuario) {
  const client = await pool.connect();
  try {
    const res = await pool.query("select nombre,apellidos,dc.fecha from comunicado as c join detalle_comunicado as dc on c.id=dc.id_comunicado join usuario on usuario.ci=dc.ci_usuario where ci_usuario=$1 and visto=true ",[ci_usuario]);
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
}

async function getDetalleComunicado(ciUsuario) {
  const client = await pool.connect();
  try {
    const res = await pool.query("select c.descripcion,c.url,dc.fecha from comunicado as c join detalle_comunicado as dc on c.id=dc.id_comunicado where ci_usuario=$1 and visto=false", [
      ciUsuario,
    ]);
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
}
 
async function createComunicado(id_comunicado,ci_usuario,descripcion,url,ci_administrador) {
  const client = await pool.connect();
  try {
    const res = await pool.query("SELECT * FROM crear_comunicado($1,$2,$3,$4,$5)", [id_comunicado,descripcion,url,ci_usuario,ci_administrador
    ]);
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
}



async function deleteComunicado(idRol) {
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

export const comunicadoModels = {
  getDatosComunicado,
  getDetalleComunicado,
  createComunicado,
  deleteComunicado,

};
