import { pool } from "../../config/databaseConnection.js";

async function getDatosMateria(ciAlumno) {
  const client = await pool.connect();
  try {
    const res = await pool.query("SELECT  distinct m.nombre FROM usuario as u  JOIN registro as r on u.ci=r.ci_estudiante JOIN curso as c on r.id_curso=c.id JOIN curso_materia as cm on c.id=cm.id_curso JOIN materia as m on cm.id_materia=m.id WHERE u.ci=$1",[ciAlumno]);
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
}

async function getDetalleMateria() {
  const client = await pool.connect();
  try {
    const res = await pool.query("select * from materia");
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
}
 
async function createMateria(materia) {
  const client = await pool.connect();
  try {
    const res = await pool.query("insert into materia (nombre) values ($1)", [materia]);
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
}



async function deleteMateria(idMateria) {
  const client = await pool.connect();
  try {
    const res = pool.query("DELETE FROM materia WHERE id = $1", [idMateria]);
    client.release();
    return res;
  } catch (error) {
    client.release();
    return error;
  }
}

async function actualizarMateria(idMateria,materia) {
  const client = await pool.connect();
  try {
    const res = pool.query("UPDATE materia set nombre=$1 WHERE id = $2", [materia,idMateria]);
    client.release();
    return res;
  } catch (error) {
    client.release();
    return error;
  }
}


export const materiaModels = {
  getDatosMateria,
  getDetalleMateria,
  actualizarMateria,
  createMateria,
  deleteMateria,

};
