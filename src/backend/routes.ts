import express from 'express';
import path from 'path';
import compression from 'compression';

const projectRoot = path.resolve(__dirname, "../..");

export default function(app: express.Application) {
  app.use(compression())

  app.use(express.static("public"));
  app.use(express.static("dist/frontend"));

  app.get("/", function(req, res) {
    res.sendFile(projectRoot + "/views/index.html");
  });
}
