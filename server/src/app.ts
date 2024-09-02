require('dotenv').config();

import express from 'express';
import router from './routes/routes';

const app = express();

app.use('/', router);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
