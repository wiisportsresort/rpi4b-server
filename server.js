const fs = require('fs')
const https = require('https')
const express = require("express")

const app = express()

// Certificate
const privateKey  = fs.readFileSync('/etc/letsencrypt/live/wiisportsresorts.dev/privkey.pem', 'utf8')
const certificate = fs.readFileSync('/etc/letsencrypt/live/wiisportsresorts.dev/cert.pem',    'utf8')
const ca          = fs.readFileSync('/etc/letsencrypt/live/wiisportsresorts.dev/chain.pem',   'utf8')

const credientials = {
  key: privateKey,
  cert: certificate,
  ca: ca
}

app.use(express.static("public"))

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html")
})

const httpsServer = https.createServer(credientials, app)

const listener = httpsServer.listen(443, function() {
  console.log("Your app is listening on port " + listener.address().port)
});

