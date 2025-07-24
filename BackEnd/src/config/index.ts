import express, { json, Request, Response } from "express";
import cors, { CorsOptions, StaticOrigin } from "cors";
import morgan from 'morgan';
import { resourceRouter } from "../routes/resource.route";

const origin: StaticOrigin = [""]; //pending

const app = express();

app.use(json());

//Cors config --> diff ports connections
const corsOptions: CorsOptions = { origin, credentials: true };

app.use(cors(corsOptions));

//Morgan config --> http requests 
app.use(morgan('dev'));

//Routes
app.use(resourceRouter); //resource CRUD

//Home route
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Bienvenido a la API</h1>");
});

app.listen(3000);

console.log("Servidor corriendo en http://localhost:3000 ✅");
