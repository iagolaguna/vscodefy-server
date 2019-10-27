import 'babel-polyfill';
import dotenv from 'dotenv';
import app from './app';

dotenv.config()

const {port, PORT} = process.env;
const serverPort = port || PORT || 8095;

app.listen(serverPort, () => console.log(`server running at port ${serverPort}`));

app.use((err, req, res, next) => {
  res.status(err.httpErrorCode || 500).json(err.message || "Internal server error")
});
