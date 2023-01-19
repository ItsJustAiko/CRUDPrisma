"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('dev'));
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
exports.default = app;
