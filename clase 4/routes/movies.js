import { Router } from "express";
import { MovieController } from "../controllers/movie.js";

export const movieRouter = Router();

//todos los recursos que sean movies se identifica con movies
movieRouter.get("/", MovieController.getAll);

//recuperar peliculas por id - path-to-regex
movieRouter.get("/:id", MovieController.getById);

//todas las movies
movieRouter.post("/", MovieController.createMovie);

//actualizar id
movieRouter.patch("/:id", MovieController.updateMovie);

//eliminar movie
movieRouter.delete("/:id", MovieController.deleteMovie);
