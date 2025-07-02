import express, { json, Request, Response } from "express";
import cors, { CorsOptions, StaticOrigin } from "cors";
import { formRouter } from "./routes/forms.route";
const origin: StaticOrigin = [""];

const app = express();

app.use(json());

//Cors config
const corsOptions: CorsOptions = { origin, credentials: true };

app.use(cors(corsOptions));

//Routes
app.use(formRouter); //Form CRUD

//Home route
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Bienvenido a la API</h1>");
});

app.listen(3000);

console.log("Servidor corriendo en http://localhost:3000 ✅");
