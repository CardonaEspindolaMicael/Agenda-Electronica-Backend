//import dotenv from 'dotenv'; dotenv.config();
import app from "./app.js"; 

app.listen(process.env.PORT ,'192.168.0.13' || 'localhost', ()=> {
  let message = "Server is running on port " + process.env.PORT ; 
  console.log(message); 

} ); 
