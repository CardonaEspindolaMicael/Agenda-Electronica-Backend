//import dotenv from 'dotenv'; dotenv.config();
import app from "./app.js"; 

app.listen(process.env.PORT || 3000, ()=> {
  let message = "Server is running on port " + process.env.PORT ; 
  console.log(message); 

} ); 
