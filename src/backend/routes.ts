import express from 'express';
import path from 'path';

const projectRoot = path.resolve(__dirname, "../..");

export default function(app: express.Application) {
  app.use(express.static("public"));
  app.use(express.static("dist/frontend"));

  app.get("/", function(req, res) {
    res.sendFile(projectRoot + "/views/index.html");
  });
}
