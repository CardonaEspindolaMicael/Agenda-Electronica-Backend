import { rolModels } from "./rol.model.js";

const getDatosRol = async (req, res) => {
  try {
    const response = await rolModels.getDatosRol();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
const getDetalleRol = async (req, res) => {
  const { idRol } = req.params;
  try {
    const response = await rolModels.getDetalleRol(idRol);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
const createRol = async (req, res) => {
  const RolBody=req.body;
  try {
    const response = await rolModels.createRol(RolBody);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.json(404).json(error);
  }
};

const updateRol = async (req, res) => {
  const { idRol } = req.params;
  try {
    const response = await rolModels.updateRol(idRol,req.body);
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};


const deleteRol = async (req, res) => {
  const { idRol } = req.params;
  try {
    const response = await rolModels.deleteRol(idRol);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const rolController = {
  getDatosRol,
  getDetalleRol,
  updateRol,
  createRol,
  deleteRol
};
