const { Item } = require("../db/item");
const bodyParser = require('body-parser');

const setupApi = (app, db) => {

  app.use(bodyParser.json({ limit: '500mb' })); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
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
  app.get("/api/items", async (request, response) => {
    const rows = await db.all("SELECT * from Items");
    response.send(JSON.stringify(rows));
  });
  app.get("/api/item", async (request, response) => {
    const { pageIndex, pageSize } = request.query;
    const index = Number.parseInt(pageIndex, 10) || 0;
    const size = Number.parseInt(pageSize, 10) || 10;
    
    const item = await Item.findAndCountAll({
        limit: size,
        offset: index * size,
    });
    item.maxPages = Math.ceil(item.count / size)
    response.status(200);
    response.json(item);
  });
  app.post("/api/item", async (request, response) => {
      const { items } = request.body;
      await Item.bulkCreate(items, { returning: false });
      response.status(200);
      response.json(items);
  });
  
};

module.exports = { setupApi };