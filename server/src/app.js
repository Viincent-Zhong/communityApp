require('dotenv').config();

const express = require('express');
const { PrismaClient } = require('@prisma/client')
const app = express();

const prisma = new PrismaClient()

app.get('/', (req, res) => {
  prisma.user.findMany().then((users) => {
    res.json(users)
  })
  // res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
