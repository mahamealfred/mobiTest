import express from "express";
import cors from "cors";
import routes from "./routes";

const app=express();
const Port=5000;

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(Port, ()=>{
    console.log(`Server is ready on http://localhost:${Port}`);
})
