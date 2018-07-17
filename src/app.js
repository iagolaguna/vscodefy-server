import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import HttpStatus from 'http-status';
import Router from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', cors({
  origin: false
}), Router);


app.use((err, request, response) => {
  response
    .status(err.status || HttpStatus.INTERNAL_SERVER_ERROR)
    .json({
      err: err.message
    });
});

export default app;
