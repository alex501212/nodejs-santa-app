const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const server = http.createServer(app);
const routes = require("./routes/user-routes");

require("./jobs/mailer");

app.set("view engine", "ejs");
app.use(bodyParser());
app.use(morgan());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.get("/error", (req, res) => {
  res.render("error", {
    error: req.query.error,
  });
});

app.use("/", routes);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
