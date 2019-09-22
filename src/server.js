const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 8080;

//define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
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

const { Client } = require("pg");
const client = new Client({
  user: "wnuvnkgceokgvn",
  password: "2645ef631e8c9100a4a82d71ae79f9213e8389c68f257994798ed7faa04515a3",
  host: "ec2-107-20-251-130.compute-1.amazonaws.com",
  port: 5432,
  database: "d5j9t6vspri53v",
  ssl: true
});
// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "wnuvnkgceokgvn",
//   password: "2645ef631e8c9100a4a82d71ae79f9213e8389c68f257994798ed7faa04515a3",
//   host: "ec2-107-20-251-130.compute-1.amazonaws.com",
//   port: 5432,
//   database: "d5j9t6vspri53v",
//   ssl: true
// });

// client.connect();
client.connect().then(() => console.log("connected"));

// const search = (request, response) => {
//   pool.query("SELECT user_id FROM abc", (error, results) => {
//     console.log(results);
//     if (error) {
//       throw error;
//     }
//     for (let row of results.rows) {
//       console.log(JSON.stringify(row));
//     }
//     response.status(200).json(results.rows);
//   });
// };

var search = "abc,kbd,asdsa"; //screen searc bar
search = search.replace(/,/g, "' and summary like '%");
var searchword = "summary like '%" + search + "%'";
client.query(
  "SELECT * FROM article_info where " + searchword + ";",
  (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  }
);
// app.get("/search", (req, res) => {
//   client.query("SELECT * FROM journal;", (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//       console.log(JSON.stringify(row));
//     }
//     client.end();
//   });
//   res.send(res.rows);
// });

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
