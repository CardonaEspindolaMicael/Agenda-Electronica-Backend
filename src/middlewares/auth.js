import { verifyToken } from "../services/auth/auth.controllers.js"



 export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ').pop()
    const tokenData = await verifyToken(token)
    if (tokenData.carnet) {
      next()
    } else {
      res.status(400).json({ message: "Logueate primero" , success:false});
    }

  } catch (error) {
   console.log(error)
   res.status(400).json({ message: "Logueate primero" , success:false});
  }

}

