require('dotenv').config();

import express from 'express';
import router from './routes/routes';
import { debugMiddleware } from './middleware/debug';
const cookieParser = require('cookie-parser')
const cors = require("cors");

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(debugMiddleware);

app.use('/', router);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
