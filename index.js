const Axios=require("axios");
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const puppeteer = require('puppeteer');
var axios = require("axios").default;
const JSONdb = require('simple-json-db');
app.use(express.json());
app.use(cors());
const littledb = new JSONdb('./JSONDB/database.json');


app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept")
  next();
})

if (process.env.CLEARDB_DATABASE_URL) {
  // console.log('yes using CLEARDB_DATABASE_URL')
  // console.log(process.env.CLEARDB_DATABASE_URL)
  var db = mysql.createPool(process.env.CLEARDB_DATABASE_URL)
} else {
   var db = mysql.createPool('mysql://b6f6f5c1639476:9e638cc8@us-cdbr-east-04.cleardb.com/heroku_34c644139b40fcc?reconnect=true');
};


app.get("/getallcountries", (req, res) => {

  db.query(
    `select * from countries`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getalldata", (req, res) => {

  db.query(
    `select *
from INFORMATION_SCHEMA.COLUMNS
where TABLE_NAME='countries'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/searchcountries/:country", (req, res) => {
  const country = req.params.country;

console.log(req.body)
  db.query(
    `SELECT * FROM countries WHERE name="${country}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/searchstats/:stat", (req, res) => {
  const stat = req.params.stat;

console.log(req.params.stat)
  db.query(
    `SELECT ${stat},name,population FROM countries where ${stat} && population is not null;`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result)
        res.send(result);
      }
    }
  );
});






if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, "./client/build")));
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
}

app.listen(process.env.PORT||5000, () => {
  console.log("Yey, your server is running on port 5000");
});
