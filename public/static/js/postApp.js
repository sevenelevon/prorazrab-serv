const URI = "http://localhost:1337"; //http://localhost:1337/api/posts?populate=%2A
async function getAllPosts() {
  const res = await fetch(`${URI}/api/posts?populate=%2A`);
  const posts = await res.json();

  const resCategory = await fetch(`${URI}/api/categories`);
  const categorys = await resCategory.json();

  const resTags = await fetch(`${URI}/api/hashtags`);
  const tags = await resTags.json();

  console.log(posts);
  posts.data.slice(0, 3).forEach((post) => RecentPostHtml(post.attributes));
  categorys.data.forEach((category) => CategoryToHtml(category.attributes));
  tags.data.forEach((tag) => TagToHtml(tag.attributes));
  tags.data.forEach((tag) => TagFooterToHtml(tag.attributes));
  posts.data.slice(-1).forEach((post) => RelatedPosts(post.attributes));
  posts.data.slice(-2, -1).forEach((post) => RelatedBackPosts(post.attributes));

}

window.addEventListener("DOMContentLoaded", getAllPosts);

function RecentPostHtml({ title, date, imageSmall, slug }) {
  const recentPostLists = document.getElementById("recentPostLists");
  recentPostLists.insertAdjacentHTML(
    "afterbegin",
    `
    <li class="clearfix"> 
      <div class="thumb">
          <a href="/posts/${slug}"><img style="width: 70px; height: 70px" src="${URI}${imageSmall.data.attributes.url}" alt=""></a>
      </div>
      <div class="entry-header">
          <h6><a href="/posts/${slug}">${title}</a></h6>
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

function TagFooterToHtml({ hashtag }) {
  const tagLists = document.getElementById("tagFooterLists");
  tagLists.insertAdjacentHTML(
    "afterbegin",
    `
      <a href="#">${hashtag}</a>
        `
  );
}

function RelatedPosts( {title, date, imageSmall, slug }) {
  const postNextLists = document.getElementById("postNextLists");
  postNextLists.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="post-next">
    <a href="/posts/${slug}">
      <div class="thumb">
        <img
          src="${URI}${imageSmall.data.attributes.url}"
          alt=""
        />
      </div>
      <div class="entry-header">
        <h6>${title}</h6>
        <span class="post-on">
          <span class="entry-date">${date}</span>
        </span>
      </div>
    </a>
  </div>
        `
  );
}

function RelatedBackPosts( {title, date, imageSmall, slug }) {
  const postNextLists = document.getElementById("postNextLists");
  postNextLists.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="post-prev">
    <a href="/posts/${slug}">
      <div class="thumb">
        <img
          src="${URI}${imageSmall.data.attributes.url}"
          alt=""
        />
      </div>
      <div class="entry-header">
        <h6>${title}</h6>
        <span class="post-on">
          <span class="entry-date">${date}</span>
        </span>
      </div>
    </a>
  </div>
        `
  );
}
