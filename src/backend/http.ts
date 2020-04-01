import { config as dotenvConfig } from 'dotenv';
import express from 'express';
import http from 'http';
import createRoutes from './routes';

dotenvConfig({ path: '../../.env'});

const app = express();

createRoutes(app);

http.createServer(app).listen(process.env.HTTP_PORT, () => console.log('express: app started at http://localhost:' + process.env.HTTP_PORT));
