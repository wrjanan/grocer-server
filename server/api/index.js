const { Badge } = require("../db/badges");
const bodyParser = require('body-parser');

//import { Badge } from "../db/badge.js";
const setupApi = (app, db) => {

  app.use(bodyParser.json({ limit: '5000mb' })); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true, limit: '5000mb' }));
  app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "*");

      next();
  });
  
  // A test route to make sure the server is up.
  app.get("/api/ping", async (request, response) => {
    response.send("pong!");
  });

  // A test route to make sure the sample database is working
  // More complex API calls can require assembling some JSON which means 
  // waiting for multiple queries.  That's why we use promises.
  app.get("/api/todos", async (request, response) => {
    const rows = await db.all("SELECT * from todos");
    response.send(JSON.stringify(rows));
  });
  app.get("/api/badges", async (request, response) => {
    const rows = await db.all("SELECT * from Badges");
    response.send(JSON.stringify(rows));
  });
  app.get("/api/badge", async (request, response) => {
    const { pageIndex, pageSize } = request.query;
    const index = Number.parseInt(pageIndex, 10) || 0;
    const size = Number.parseInt(pageSize, 10) || 10;
    
    const badge = await Badge.findAndCountAll({
        limit: size,
        offset: index * size,
    });
    badge.maxPages = Math.ceil(badge.count / size)
    response.status(200);
    response.json(badge);
  });

  app.post("/api/badge", async (request, response) => {
      const { badges } = request.body;
      await Badge.bulkCreate(badges, { returning: false });
      response.status(200);
      response.json(badges);
  });
};

module.exports = { setupApi };