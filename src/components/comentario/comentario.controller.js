import { comentarioModels } from "./comentario.model.js";

const getDetalleComentario = async (req, res) => {
  const { idActividad } = req.params;
  try {
    const response = await comentarioModels.getDetalleComentario(idActividad);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
const createComentario = async (req, res) => { 
  const {comentario,idActividad,ciUsuario}=req.body;
  try {
    const response = await comentarioModels.createComentario(comentario,idActividad,ciUsuario);
    return res.json({
      message:['comentario creado'],
      error:'Sin errores',
      statusCode:200,
      data:response
    })

  } catch (error) {
    return res.json({    
      message:[`Problemas de conexion`],
      error:'not found',
      statusCode:500})// 
  }
};

const updateRol = async (req, res) => {
  const { idRol } = req.params;
  try {
    const response = await comentarioModels.updateRol(idRol,req.body);
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
    const response = await comentarioModels.deleteRol(idRol);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const comentarioController = {
  getDetalleComentario,
  updateRol,
  createComentario,
  deleteRol
};
