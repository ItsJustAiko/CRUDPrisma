import { PrismaClient } from '@prisma/client';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';

const app = express();
const prisma = new PrismaClient();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// -------- Routes -------- //

app.get('/', (req, res) => {
  res.send(`
        Prisma CRUD
        <br />
        Routes :<br />
            - GET /users<br />
            - GET /users/:id<br />
            - POST /users<br />
            - PUT /users/:id<br />
            - DELETE /users/:id
    `);
});

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(req.params.id)
    }
  });
  res.json(user);
});

app.post('/users', async (req, res) => {
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
  });
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const user = await prisma.user.update({
    where: {
      id: Number(req.params.id)
    },
    data: {
      name: req.body.name,
      email: req.body.email
    }
  });
  res.json(user);
});

app.delete('/users/:id', async (req, res) => {
  const user = await prisma.user.delete({
    where: {
      id: Number(req.params.id)
    }
  });
  res.json(user);
});

// -------- End Routes -------- //

export default app;
