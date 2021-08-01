const express = require("express");
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require("path");
const {setupApi} = require("./api");
const {setupDatabase, dropDatabase} = require("./db");
const {redirectToHttps} = require("./util");
require('dotenv').config();
// Setup our database and API and express server
const setupServer = async () => {

  // Clean start
  // dropDatabase();
  
  // Setup our database
  const db = await setupDatabase();

  // Create our server
  const app = await express();

  // Force HTTPs in production, but avoid needing a certificate for development
  if ( process.env.NODE_ENV === "production" ) {
    //redirectToHttps(app);
  }

  // Setup the API endpoints (see api/index.js)
  // and have them powered by the DB
  setupApi(app, db);

  // Express port-switching logic, which helps this CRA apps run on Glitch.
  // To learn more about this neat trick, please read: 
  // https://dev.to/glitch/create-react-app-and-express-together-on-glitch-28gi
  let port;
  if (process.env.NODE_ENV === "production") {
    port = process.env.PORT || 3001;
    app.use(express.static(path.join(__dirname, "../public")));
    app.get("*", (request, response) => {
      response.sendFile(path.join(__dirname, "../public/index.html"));
    });
  } else {
    port = 3001;
    console.log("⚠️ Not seeing your changes as you develop?");
    console.log(
      "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
    );
  }

  // const privateKey  = fs.readFileSync('./ssl/privatekey.pem', 'utf8');
  // const certificate = fs.readFileSync('./ssl/cert.pem', 'utf8');
  // const chain = fs.readFileSync('./ssl/chain.pem', 'utf8');

  // const credentials = {key: privateKey, cert: certificate, ca: chain};

  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(app);

  // Start the listener!
  const listener = app.listen(port, () => {
    console.log("❇️ Express server is running on port", listener.address().port);
  });

  // Start the listener!
  const listener2 = httpServer.listen(8080, () => {
    console.log("❇️ Express server is running on port", 8080);
  });

  const listenerSecure = httpsServer.listen(8443, () => {
    console.log("❇️ Express server is running on port", 8443);
  });
}

// Run it now
setupServer();


