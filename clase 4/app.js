import express, {json} from 'express'
import cors from 'cors'
import { movieRouter } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';
const app = express();

app.disable("x-powered-by");
app.use(json());
//app.use(corsMiddleware());
app.use(cors())
app.use('/movies', movieRouter)


app.listen(3000, () => {
  console.log({ message: "Hello world" });
});
