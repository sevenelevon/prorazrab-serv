const URI = "http://localhost:1337"; //http://localhost:1337/api/posts?populate=%2A
async function getAllPosts() {
  const res = await fetch(`${URI}/api/posts?pagination[start]=${1}&pagination[limit]=${4}&populate=%2A`);
  const posts = await res.json();

  const resCategory = await fetch(`${URI}/api/categories`);
  const categorys = await resCategory.json();

  const resTags = await fetch(`${URI}/api/hashtags`);
  const tags = await resTags.json();

  posts.data.slice(0,3).forEach((post) => RecentPostHtml(post.attributes));
  categorys.data.forEach((category) => CategoryToHtml(category.attributes));
  tags.data.forEach((tag) => TagToHtml(tag.attributes));
}

window.addEventListener("DOMContentLoaded", getAllPosts);

function RecentPostHtml({ title, date, imageSmall, slug }) {
  const recentPostLists = document.getElementById("recentPostLists");
  recentPostLists.insertAdjacentHTML(
    "afterbegin",
    `
    <li class="clearfix"> 
      <div class="thumb">
          <a href="posts/${slug}"><img style="width: 70px; height: 70px" src="${URI}${imageSmall.data.attributes.url}" alt=""></a>
      </div>
      <div class="entry-header">
          <h6><a href="posts/${slug}">${title}</a></h6>
          <span class="post-on"><span class="entry-date">${date}</span></span>
      </div>
    </li>
      `
  );
}

function CategoryToHtml({ category }) {
  const postList = document.getElementById("categoryLists");
  postList.insertAdjacentHTML(
    "afterbegin",
    `
    <li><a href="#">${category}</a> <span class="posts-count"></span></li>
    `
  );
}
// docs post image


function TagToHtml({ hashtag }) {
  const tagLists = document.getElementById("tagLists");
  tagLists.insertAdjacentHTML(
    "afterbegin",
    `
      <a href="#">${hashtag}</a>
      `
  );
}

// // Pagnation

// async function paginationMain() {
//     const postsData = await getAllPosts();
//     let currentPage = 1;
//     let rows = 10

//     function displayList(arrData, rowPerPage, page) {
//         const postEl = document.querySelector('.paginationClass');
        
//         const start = rowPerPage * page;
//         const end = start + rowPerPage;
//         const paginationData = arrData.slice(start, end);

//         paginationData.forEach((el) => {
//             const postEl = document.createElement("div");
//             postEl.classList.add('post') // В этот див мы кладем класс post
//             postEl.innerText = `${el.title}`;
//             postsEl.appendChild(postEl)

//         })
//     }

//     function displayPagination() {
        
//     }

//     function displayPaginationBtn() {

//     }

//     displayList(postsData, rows, currentPage)
// }

// paginationMain()
