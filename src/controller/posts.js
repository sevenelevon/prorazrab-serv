const axios = require("axios");
const { marked } = require("marked");

const newsAPI = async (req, res) => {
  const { slug } = req.params;
  try {
    const newsAPI = await axios
      .get(`http://localhost:1337/api/posts/${slug}?populate=%2A`)
      .then((response) => {
        const article = response.data.data.attributes;
        const content = marked.parse(article.redactor);
        const {
          title,
          redactor,
          redactor2,
          date,
          quote,
          title2,
          image,
          image2,
          imageSmall,
          slug,
        } = response.data.data.attributes;
        res.render("post", {
          slug: slug,
          image: image.data.attributes.url,
          image2: image2.data.attributes.url,
          imageSmall: imageSmall.data.attributes.url,
          title: title,
          redactor: content,
          redactor2: redactor2,
          date: date,
          quote: quote,
          title2: title2,
        });
      });
  } catch (err) {
    // res.status(404).redirect("/404");
    console.log(err);
  }
};

module.exports = newsAPI;
