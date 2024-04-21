import { materiaModels } from "./materia.model.js";

const getDatosmateria = async (req, res) => {
  const {ciAlumno}=req.params
  try {
    const response = await materiaModels.getDatosMateria(ciAlumno);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
const getMateria = async (req, res) => {

  try {
    const response = await materiaModels.getDetalleMateria();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
const createmateria = async (req, res) => {

  const {materia}=req.body;
  try {
    const response = await materiaModels.createMateria(materia);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.json(404).json(error);
  }
};



const deletemateria = async (req, res) => {
  const { idMateria } = req.params;
  try {
    const response = await materiaModels.deleteMateria(idMateria);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

const actualizarMateria = async (req, res) => {
  const { idMateria } = req.params;
  const {materia}= req.body;
  console.log(materia)
  try {
    const response = await materiaModels.actualizarMateria(idMateria,materia);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const materiaController = {
  getDatosmateria,
  getMateria,
  actualizarMateria,
  createmateria,
  deletemateria
};
