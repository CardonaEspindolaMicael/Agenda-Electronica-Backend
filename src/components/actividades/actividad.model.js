import { pool } from "../../config/databaseConnection.js";

async function getDatosPorMateriasYCurso(ciProfesor) {
  const client = await pool.connect();
  try {
    const res = await pool.query("select * from obtener_materias_y_cursos($1)",[ciProfesor]);
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
}

async function getActividadesPorCI(ciProfesor) {
  const client = await pool.connect();
  try {
    const res = await pool.query("select * from actividad_usuario where ci_profesor=$1",[ciProfesor]);
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
}

async function obtenerEstudianteProfesor(ciProfesor) {
  const client = await pool.connect();
  try {
    const res = await pool.query("select * from obtener_estudiantes_profesor($1)",[ciProfesor]);
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
}

async function obtenerVistoActividades(ciProfesor,grado,paralelo,materia) {
  const client = await pool.connect();
  try {
    const res = await pool.query("select * from obtener_vistos_actividades($1,$2,$3,$4)",[ciProfesor,grado,paralelo,materia]);
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
}


async function getDetalleActividad(ciAlumno,materia) {
  const client = await pool.connect();
  try {
    const res = await pool.query("select * from obtener_actividades_pendientes_por_materia($1, $2)", [
      ciAlumno,materia
    ]);
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
}
 
async function createActividad(idActividad,titulo,descripcion,url,idMateria,ciProfesor,grado,paralelo) {
  const client = await pool.connect();
  try {
    const res = await pool.query("CALL crear_actividades($1,$2,$3,$4,$5,$6,$7,$8)", [idActividad,titulo,descripcion,url,idMateria,ciProfesor,grado,paralelo]);
    client.release();
    return res.rows;
  } catch (error) {
    client.release();
    return error;
  }
}


async function actualizarVisto(idActividad) {
  const client = await pool.connect();
  try {
    const res = pool.query("update actividad_usuario set visto='true' where id_actividad=$1", [idActividad]);
    client.release();
    return res;
  } catch (error) {
    client.release();
    return error;
  }
}

export const actividadModels = {
  getDatosPorMateriasYCurso,
  getActividadesPorCI,
  getDetalleActividad,
  actualizarVisto,
  createActividad,
  obtenerEstudianteProfesor,
  obtenerVistoActividades

};
