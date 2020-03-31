import fs from 'fs';
import https from 'https';
import express from 'express';
import createRoutes from './routes';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '../../.env' });

const app = express();

// Certificate
const key = 'privkey.pem',
  cert = 'cert.pem',
  ca = 'chain.pem';

const credientials = {
  key: fs.readFileSync(process.env.SSL_PATH + '/' + key, 'utf8'),
  cert: fs.readFileSync(process.env.SSL_PATH + '/' + cert, 'utf8'),
  ca: fs.readFileSync(process.env.SSL_PATH + '/' + ca, 'utf8')
};

createRoutes(app);

const httpsServer = https.createServer(credientials, app);

const listener = httpsServer.listen(443, function() {
  console.log('App listening on port ' + process.env.HTTPS_PORT);
});
