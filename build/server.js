"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const server = http_1.default.createServer(app_1.default);
server.listen(process.env.PORT, () => {
    console.log(`[SERVER] - Listening at port : ${process.env.PORT}`);
});
process.on('exit', () => {
    server.close();
});
process.on('kill', () => {
    server.close();
});
