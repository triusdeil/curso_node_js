import { MovieModel } from "../models/movie.js";
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export class MovieController {
  static async getAll(req, res) {
    const { genre } = req.query;
    const movies = await MovieModel.getAll({ genre });
    res.json(movies);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const movie = await MovieModel.getById({ id });
    if (movie) return res.json(movie);
    res.status(404).statusCode({ message: "movie not found" });
  }

  static async createMovie(req, res) {
    const result = validateMovie(req.body);
    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }
    const newMovie = await MovieModel.createMovie({ input: result.data });
    res.status(201).json(newMovie);
  }

  static async updateMovie(req, res) {
    const { id } = req.params;
    const result = validatePartialMovie(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const updateMovie = await MovieModel.updateMovie({
      id,
      input: result.data,
    });
    return res.json(updateMovie);
  }

  static async deleteMovie(req, res) {
    const { id } = req.params;
    const result = await MovieModel.deleteMovie({ id });
    if (result === false) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.json({ message: "movie deleted" });
  }
}
