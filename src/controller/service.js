const axios = require("axios");

const serviceApi = async (req, res) => {
  try {
    const serviceApi = await axios
      .get("http://localhost:1337/api/services")
      .then((response) => {
        const index = response.data.data;
        console.log(index);
        res.render("index", {
          data: index,
        });
      });
  } catch (err) {
    res.status(404).redirect("/404");
    console.log(err);
  }
};

const servicesSingleApi = async (req, res) => {
  try {
    const { slug } = req.params;
    const servicesApi = await axios
      .all([
        axios.get(`http://localhost:1337/api/services/${slug}?populate=%2A`),
        axios.get("http://localhost:1337/api/services"),
      ])
      .then(
        axios.spread((response, category) => {
          const services = response.data.data;
          const categorys = category.data.data;
          res.render("service", {
            elements: services,
            data: categorys,
          });
        })
      );
  } catch (err) {
    // res.status(404).redirect("/404");
    console.log(err);
  }
};

module.exports = { servicesSingleApi, serviceApi };
