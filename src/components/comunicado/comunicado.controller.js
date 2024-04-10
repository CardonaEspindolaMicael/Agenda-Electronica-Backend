import { comunicadoModels } from "./comunicado..model.js";

const getDatosComunicado = async (req, res) => {
  const {ciUsuario}=req.params
  try {
    const response = await comunicadoModels.getDatosComunicado(ciUsuario);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
const getDetalleComunicado = async (req, res) => {
  const { ciUsuario } = req.params;
  try {
    const response = await comunicadoModels.getDetalleComunicado(ciUsuario);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
const createComunicado = async (req, res) => {

  const {id_comunicado,ci_usuario,descripcion,url,ci_administrador}=req.body;
  try {
    const response = await comunicadoModels.createComunicado(id_comunicado,ci_usuario,descripcion,url,ci_administrador);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.json(404).json(error);
  }
};



const deleteComunicado = async (req, res) => {
  const { idComunicado } = req.params;
  try {
    const response = await comunicadoModels.deleteComunicado(idComunicado);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const comunicadoController = {
  getDatosComunicado,
  getDetalleComunicado,
  createComunicado,
  deleteComunicado
};
