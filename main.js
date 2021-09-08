const jsonServer = require("json-server");
const auth = require("json-server-auth");
const moment = require("moment");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.db = router.db;
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

router.render = (req, res) => {
  res.jsonp(res.locals.data);
};

// Use default router
const PORT = process.env.PORT || 5000;

server.use(auth);
server.use(router);
server.listen(PORT, () => {
  console.log("JSON Server is running");
});
