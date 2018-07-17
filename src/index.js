import 'babel-polyfill';
import dotenv from 'dotenv';
import app from './app';

const result = dotenv.config()

const {port, PORT} = process.env;
const serverPort = port || PORT || 8095;

app.listen(serverPort, () => console.log(`server running at port ${serverPort}`));
