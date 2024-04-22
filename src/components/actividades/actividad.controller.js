import { actividadModels } from "./actividad.model.js";
import { v4 } from "uuid";

const getDatosPorMateriasYCurso = async (req, res) => {
  const {ciProfesor}=req.params
  try {
    const response = await actividadModels.getDatosPorMateriasYCurso(ciProfesor);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getActividadesPorCI = async (req, res) => {
  const {ciProfesor}=req.params
  try {
    const response = await actividadModels.getActividadesPorCI(ciProfesor);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

const  obtenerEstudianteProfesor = async (req, res) => {
  const {ciProfesor}=req.params
  try {
    const response = await actividadModels. obtenerEstudianteProfesor(ciProfesor);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

const  obtenerVistoActividades = async (req, res) => {
  const {ciProfesor,grado,paralelo,materia}=req.params
  try {
    const response = await actividadModels.obtenerVistoActividades(ciProfesor,grado,paralelo,materia);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
const getDetalleActividad = async (req, res) => {
  const { ciAlumno,materia } = req.params;;
  try { 
    const response = await actividadModels.getDetalleActividad(ciAlumno,materia);
    
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
const createActividad = async (req, res) => {
   
  const {idActividad,titulo,descripcion,url,idMateria,ciProfesor,grado,paralelo}=req.body;
  try {
    const response = await actividadModels.createActividad(idActividad,titulo,descripcion,url,idMateria,ciProfesor,grado,paralelo);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.json(404).json(error);
  }
};



const actualizarVisto = async (req, res) => {
  const { idActividad } = req.params;
  try {
    const response = await actividadModels.actualizarVisto(idActividad);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const actividadController = {
  getDatosPorMateriasYCurso,
  getActividadesPorCI,
  getDetalleActividad,
  createActividad,
  actualizarVisto,
  obtenerEstudianteProfesor,
  obtenerVistoActividades
};
