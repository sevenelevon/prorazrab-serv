const express = require("express");
const router = express.Router();
const axios = require("axios");
const newsAPI = require("../controller/posts");
const { portfolioAPI, portfolioDetails } = require("../controller/portfolio");
const { servicesSingleApi, serviceApi } = require("../controller/service");
const Pagination = require("../controller/blog");
const Sitemap = require("../controller/sitemap");

router.get('*', (req, res, next) => { res.locals = ({ req: req }); next(); });

router.get("/", serviceApi);
router.get("/service/:slug", servicesSingleApi);

router.use((req, res, next) => {
  axios.get('http://localhost:1337/api/services')
    .then(response => {
      // Attach the data to res.locals
      res.locals.data = response.data.data;
      next();
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});


router.get("/it-services", (req, res) => {
  res.render("it-services");
});

router.get("/web-development", (req, res) => {
  res.render("web-development");
});

router.get("/mobile-development", (req, res) => {
  res.render("mobile-development");
});

router.get("/faq", (req, res) => {
  res.render("faq");
});

router.get("/portfolio", portfolioAPI);

router.get("/portfolio-details/:id", portfolioDetails);

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/blog", Pagination);

router.get("/posts/:slug", newsAPI);

router.get("/404", (req, res) => {
  res.status(404).render("404-error");
});

router.get("/sitemap", Sitemap);

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/robots.txt");
});

module.exports = router;
