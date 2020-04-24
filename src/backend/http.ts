import { config as dotenvConfig } from 'dotenv';
import express from 'express';
import http from 'http';
import createRoutes from './routes';
// s
dotenvConfig();

const app = express();

createRoutes(app);

http.createServer(app).listen(8080, () => console.log('express: app started at http://localhost:' + 8080));
