const fs = require("fs");
const https = require("https");
const express = require("express");
const date = require("./dateFormat");

const app = express();
const stdin = process.stdin;

// Timestamped logging
const logBlank = console.log;
console.log = function(message) {
  logBlank(date.format(new Date(), "m/d/y \\a\\t H:i:s") + ": server.js: " + message);
};

// Certificate
const privateKey = fs.readFileSync("/etc/letsencrypt/live/wiisportsresorts.dev/privkey.pem", "utf8");
const certificate = fs.readFileSync("/etc/letsencrypt/live/wiisportsresorts.dev/cert.pem", "utf8");
const ca = fs.readFileSync("/etc/letsencrypt/live/wiisportsresorts.dev/chain.pem", "utf8");

const credientials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};
const httpsServer = https.createServer(credientials, app);

app.use(express.static("dist"));
app.use(express.static("public"));

const bind = (dir, file) => app.get(dir, (req, res) => res.sendFile(__dirname + "/" + file));
bind("/", "index.html");

bind(
  "/.well-known/acme-challenge/A5-ZHBYp1wyMr_eu1oudEN0euNVcE8nlFl5RNZSe_GI",
   ".well-known/acme-challenge/A5-ZHBYp1wyMr_eu1oudEN0euNVcE8nlFl5RNZSe_GI"
);
bind(
  "/.well-known/acme-challenge/DGlE-ue8fFBTCbbyks2JvSQiukYOnnGyLMe8diH4i5o",
   ".well-known/acme-challenge/DGlE-ue8fFBTCbbyks2JvSQiukYOnnGyLMe8diH4i5o"
);

// without this, we would only get streams once enter is pressed
stdin.setRawMode(true);
// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();
stdin.setEncoding("utf8");
// on any data into stdin
stdin.on("data", function(key) {
  switch (key) {
    default:
      let formatted = key === " " ? "(space)" : key;
      console.log(`Unrecognized keystroke: ${formatted}`);
      break;
    case "h":
      appMessage();
      break;

    // ctrl-c (end of text)
    case "\u0003":
    case "q":
      console.log("Exiting.");
      logBlank(" ");
      process.exit();
  }
});

const listener = httpsServer.listen(443, appMessage(true));
function appMessage(first = false) {
  if (first) console.log(`Express app started on port 443.`);
  console.log(`Keybinds:`);
  console.log(`h: show this help menu`);
  console.log(`q: exit this app`);
}
