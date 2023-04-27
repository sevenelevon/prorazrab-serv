const axios = require("axios");

const Pagination = async (req, res) => {
  let page = req.query.page || 1;
  try {
    const response = await axios
      .get(
        `http://localhost:1337/api/posts?pagination[start]=${(page - 1) * 5}&pagination[limit]=${5}&populate=%2A&sort=id:DESC`
      )
      .then((response) => {
        const postsData = response.data.data

        let total = response.data.meta.pagination.total
        let totalPages = Math.ceil(total / 5);
        let pages = Array.from({length: totalPages}, (_, i) => i + 1);
        postsData.unshift();
        res.render("blog", {
          posts: postsData,
          pages,
          currentPage: page
        });
      });
  } catch (err) {
    // res.status(404).redirect("/404");
    console.log(err);
  }
};

module.exports = Pagination;
