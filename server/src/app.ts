require('dotenv').config();

import express, { Request, Response } from 'express';
import prisma from './prisma/client';
const app = express();

app.get('/', (req: Request, res: Response) => {
  prisma.user.findMany().then((users: any) => {
    res.json(users)
  })
  // res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
