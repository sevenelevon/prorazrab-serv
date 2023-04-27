const express = require("express");
const app = express();
const router = require("./route/router");
const path = require("path");
// const ejsLint = require('ejs-lint');


const port = 3000;
const robots = require('express-robots-txt')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.set("views", path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public/static')))
app.use(robots(path.join(__dirname, '../public/robots.txt')));

app.use("/", router);

app.all('*', (req, res) => {
  res.status(404).render('404-error');
});
