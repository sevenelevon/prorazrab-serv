const axios = require("axios");

const Sitemap = async (req, res) => {
  try {
    const response = await axios
      .get(
        `http://localhost:1337/api/posts`
      )
      .then((response) => {
        const SitemapData = response.data.data
        console.log(SitemapData);
        res.render("sitemap", {
          siteMap: SitemapData,
        });
      });
  } catch (err) {
    // res.status(404).redirect("/404");
    console.log(err);
  }
};

module.exports = Sitemap;
