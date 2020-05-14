const express = require("express");

const app = express();

const http = require("http").Server(app);

app.use(express.json());

const cors = require("cors");
app.use(cors());

require("./database");

const routes = require("./routes");
app.use(routes);

http.listen(3333, () => {
  console.log("ON");
});
