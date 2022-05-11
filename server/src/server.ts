import express from 'express';
import { routes } from './routes';
import cors from 'cors';

const app = express();

app.use(cors()); // vai dizer qual fron pode acessar esse back
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log('Server started on port 3333');
})