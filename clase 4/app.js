import express, {json} from 'express'
import { randomUUID } from 'node:crypto';
import cors from 'cors'
import { validateMovie, validatePartialMovie } from './schemas/movies.js';
import { readJSON } from './utils/utils.js';

const app = express();

//importar json
const movies = readJSON('../movies.json')

app.disable("x-powered-by");
app.use(json());
app.use(cors());

//todos los recursos que sean movies se identifica con movies
app.get("/movies", (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredMovie = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovie);
  }
  res.json(movies);
});

app.post("/movies", (req, res) => {
  const result = validateMovie(req.body);

  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  }

  const newMovie = {
    id: randomUUID(),
    ...result.data,
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
});

//recuperar peliculas por id - path-to-regex
app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).statusCode({ message: "movie not found" });
});

//actualizar id
app.patch("/movies/:id", (req, res) => {
  const { id } = req.params
  const result = validatePartialMovie(req.body);
  
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
});

//eliminar movie
app.delete('/movies/:id', (req, res) => {
  const {id} = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1){
    return res.status(404).json({message:"Movie not found"})
  }
  movies.splice(movieIndex,1)

  return res.json({message: 'movie deleted'})
})

//recuperar peliculas por genero
app.get("");

app.listen(3000, () => {
  console.log({ message: "Hello world" });
});
