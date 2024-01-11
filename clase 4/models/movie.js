import { readJSON } from "../utils/utils.js";
import { randomUUID } from "node:crypto";

const movies = readJSON("../movies.json");

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
    }

    return movies;
  }

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id);
    return movie;
  }

  static async createMovie({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input,
    };

    movies.push(newMovie);

    return newMovie;
  }

  static async updateMovie({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
      return res.status(404).json({ message: "Movie not found" });
    }
    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input,
    };

    return movies[movieIndex];
  }

  static async deleteMovie({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return false;

    movies.splice(movieIndex, 1);
    return true;
  }
}
