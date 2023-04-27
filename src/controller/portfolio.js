const axios = require("axios");

const portfolioAPI = async (req, res) => {
  try {
    const portfolioAPI = await axios
      .get("http://localhost:1337/api/portfolios?populate=%2A")
      .then((response) => {
        const portfolio = response.data.data;
        res.render("portfolio", {
          data: portfolio,
        });
      });
  } catch (err) {
    res.status(404).redirect("/404");
    console.log(err);
  }
};

const portfolioDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const portfolioDetails = await axios
      .get(`http://localhost:1337/api/portfolios/${id}?populate=%2A`)
      .then((response) => {
        const portfolioDetails = response.data.data.attributes;
        console.log(portfolioDetails);


        res.render("portfolio-details", {
          data: portfolioDetails,
        });
      });
  } catch (err) {
    res.status(404).redirect("/404");
  }
};

module.exports = { portfolioDetails, portfolioAPI };
