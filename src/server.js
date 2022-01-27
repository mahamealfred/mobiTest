import express from "express";
import cors from "cors";
import routes from "./routes";
import xmlparser from "express-xml-bodyparser";



const app=express();
const Port=8000;

app.use(express.json());
app.use(xmlparser());
app.use(cors());
app.use(routes);



app.listen(Port, ()=>{
    console.log(`Server is ready on http://localhost:${Port}`);
})
