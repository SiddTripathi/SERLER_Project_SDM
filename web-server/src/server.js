const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

//define path for express config
const publicDirectoryPath = path.join(__dirname, "../html");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

//directories to serve
app.get("", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "The About page",
    message: "Coming soon"
  });
});
app.get("/admin", (req, res) => {
  res.render("admin", {
    title: "The Admin page",
    message: "Coming soon"
  });
});
app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "The Contact page",
    message: "Coming soon"
  });
});
app.get("/moderator", (req, res) => {
  res.render("moderator", {
    title: "The Moderator page",
    message: "Coming soon"
  });
});
app.get("/analyst", (req, res) => {
  res.render("analyst", {
    title: "The Analyst page",
    message: "Coming soon"
  });
});

app.listen(8080, () => {
  console.log("Server is up on port 8080");
});