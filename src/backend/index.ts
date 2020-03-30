import express from 'express';
import http from 'http';
import path from 'path';

const app = express();

const httpServer = http.createServer(app);

app.use(express.static(path.resolve('public')));
app.use(express.static(path.resolve('dist')));

app.get('/', (req, res) => res.sendFile(path.resolve('views/index.html')));

httpServer.listen(process.env.PORT, () => console.log('express: app started at http://localhost:' + process.env.PORT));
