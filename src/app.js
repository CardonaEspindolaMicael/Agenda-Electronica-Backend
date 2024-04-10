import express from "express";
import cors from "cors"
import router from "./routes/routes.js";

const app = express() ; 

app.use(cors()) ; 
app.use(express.json());
app.use("/api-v1", router);


export default app ; 
