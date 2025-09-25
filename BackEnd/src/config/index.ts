import express, { json, Request, Response } from "express";
import cors, { CorsOptions, StaticOrigin } from "cors";
import morgan from 'morgan';
import { resourceRouter } from "../routes/resource.route";
import { endpointRouter } from "../routes/endpoint.route";
import { authRouter } from "../routes/auth.route";
import { limiter } from "../middlewares/rateLimit";

const origin: StaticOrigin = [""]; //pending

const app = express();

app.use(json());

//Cors config --> diff ports connections
const corsOptions: CorsOptions = { origin, credentials: true };

app.use(cors(corsOptions));

//Implement rate limiter to all requests
app.use(limiter);

//Morgan config --> http requests 
app.use(morgan('dev'));

//Routes
app.use(authRouter); //auth CRUD
app.use(resourceRouter); //resource CRUD
app.use(endpointRouter); //endpoint CRUD
//Home route
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Bienvenido a la API</h1>");
});

app.listen(3000);

console.log("Servidor corriendo en http://localhost:3000 ✅");
