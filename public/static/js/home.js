const URI = "http://localhost:1337"; //http://localhost:1337/api/posts?populate=%2A

async function getAllService() {
  const res = await fetch(`${URI}/api/services`);
  const service = await res.json();

  service.data
    .slice(0, 3)
    .forEach((post) => RecentPostHtml(post.attributes, post.id));
}

function RecentPostHtml({ title, date, imageSmall }, id) {
  const recentPostLists = document.getElementById("recentPostLists");
  recentPostLists.insertAdjacentHTML(
    "afterbegin",
    `
      <li class="clearfix"> 
        <div class="thumb">
            <a href="posts/${id}"><img style="width: 70px; height: 70px" src="${URI}${imageSmall.data.attributes.url}" alt=""></a>
        </div>
        <div class="entry-header">
            <h6><a href="posts/${id}">${title}</a></h6>
            <span class="post-on"><span class="entry-date">${date}</span></span>
        </div>
      </li>
        `
  );
}
