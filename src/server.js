const path = require("path");
const express = require("express");
const hbs = require("hbs");
const bodyparser = require("body-parser");

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
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
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

app.get("/search", (req, response) => {
  if (req.query.describe.trim() == "") {
    return response.send({
      error: "Please enter something to search......"
    });
  }


  

  var search = req.query.describe; //screen searc bar
  var date1 = req.query.start;
  var date2 = req.query.endDate;  // var advSearch = req.query.desctibe;// adv search bar
  console.log("a"+date1+"a")
  if(date1==''){date1='1960-01-01'}
  if(date==''){date2='2020-01-01'}
  search = search.replace(/,/g, "' and lower(ai.summary) like '%");
  var searchword = "lower(ai.summary) like '%" + search + "%'";
  //searchword = searchword+" or (lower(at.title) like '%"+search+"%')"; 
  searchword = searchword.toLowerCase();
  console.log(searchword);




  console.log("and (at.date between '"+date1+" and "+date2+") ;");
  let dataset = [];
  console.log("SELECT at.title,at.author,at.journal_name,at.date,at.weblink FROM article_info ai,article_table at where (" +
  searchword +
  ") and ai.article_id=at.article_id and (at.date between '" + date1 +"\' and \'" + date2 + "');");
  client.query(
    "SELECT at.title,at.author,at.journal_name,at.date,at.weblink FROM article_info ai,article_table at where (" +
    searchword +
    ") and ai.article_id=at.article_id and (at.date between '"+ date1 +"' and '" + date2 + "');",
    (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(typeof row);
        console.log(JSON.stringify(row));
        dataset.push(row);
      }
      // client.end();
      response.send({
        dataset
      });
    }
  );
});

app.post("/advancedSearch", (req, res) => {
  // let data = JSON.parse(req.body.data);
  // console.log(req.body.data)
  var date1 = '1960-01-01';
  var date2 = '2020-12-12';
  searchword = '(at.date between \'' + date1 + '\' and \'' + date2 + '\')';
  console.log(searchword);

  for (let i = 0; i < req.body.data.length; i++) {



    var a = req.body.data[i].type;
    var b = req.body.data[i].method;
    c = req.body.data[i].value.toLowerCase();
    d = 'and'
    if (i > 0) { d = req.body.data[i - 1].operator; }


    if (b == 'contains') {
      c1 = d;
      s1 = a;
      s2 = 'like';
      s3 = c;
      searchword = searchword + ' ' + c1 + ' (ai.' + s1 + ' ' + s2 + ' ' + '\'%' + s3 + '%\')';
      console.log(searchword)
    }

    if (b == 'doesNotContain') {
      c1 = d;
      s1 = a;
      s2 = 'not like';
      s3 = c;
      searchword = searchword + ' ' + c1 + ' (ai.' + s1 + ' ' + s2 + ' ' + '\'%' + s3 + '%\')';
    }

    if (b == 'equal') {
      c1 = d;
      s1 = a;
      s2 = '=';
      s3 = c;
      searchword = searchword + ' ' + c1 + ' (ai.' + s1 + ' ' + s2 + ' ' + '\'' + s3 + '\')';
      console.log(searchword);
      let dataset = [];
      // console.log(searchword);

    }
  }








  //method like '%'+c+'%'
  // for (i = 1; i < n; i++) {
  // searchword = searchword + ' ' + c1 + ' (' + s1 + ' ' + s2 + ' ' + '\'' + s3 + '\')';
  // console.log(searchwor}
  // console.log(JSON.parse(req.body.data));
  // console.log(data)
  // var search = req.query.describe; //screen searc bar

  // var advSearch = req.query.desctibe;// adv search bar

  // search = search.replace(/,/g, "' and lower(ai.summary) like '%");
  // var searchword = "lower(ai.summary) like '%" + search + "%'";
  // searchword = searchword.toLowerCase();



  // var date1 = '1960-01-01';
  // var date2 = '2020-12-12';
  // //date1=;date2=;
  // searchword = '(date between \'' + date1 + '\' and \'' + date2 + '\')';
  // console.log(searchword);



  // let dataset = [];
  // console.log(search);
  // client.query(
  //   "SELECT at.title,at.author,at.journal_name,at.date,at.weblink FROM article_info ai,article_table at where " +
  //   searchword +
  //   " and ai.article_id=at.article_id;",
  //   (err, res) => {
  //     if (err) throw err;
  //     for (let row of res.rows) {
  //       console.log(typeof row);
  //       console.log(JSON.stringify(row));
  //       dataset.push(row);
  //     }
  //     // client.end();
  //     response.send({
  //       dataset
  //     });
  //   }
  // );

  let dataset = [];
  console.log(searchword);
  client.query(
    "SELECT at.title,at.author,at.journal_name,at.date,at.weblink FROM article_info ai,article_table at where (" +
    searchword +
    ") and ai.article_id=at.article_id;",
    (err, data) => {
      if (err) throw err;
      for (let row of data.rows) {
        console.log(typeof row);
        console.log(JSON.stringify(row));
        dataset.push(row);
      }
      // client.end();
      res.send({
        dataset
      });
    }
  );





});


app.listen(port, () => {
  console.log("Server is up on port " + port);
});
