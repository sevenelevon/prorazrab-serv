let page = 1;
let limit = 10;

const updatePosts = async (page) => {
    let start = (page-1)*limit;
    const response = await axios.get(`http://localhost:1337/api/posts?pagination[start]=${start}&pagination[limit]=${limit}&populate=%2A`);
    const posts = response.data;
    const totalPages = Math.ceil(response.headers['x-total-count'] / limit);
    renderPosts(posts);
    renderPagination(page, totalPages);
}

const renderPosts = (posts) => {
    let container = document.querySelector('.container');
    container.innerHTML = '';
    for (let i = 0; i < posts.length; i++) {
        let post = posts[i];
        let postElem = document.createElement('div');
        postElem.innerHTML = `<h2>${post.title}</h2> <p>${post.content}</p>`;
        container.appendChild(postElem);
    }
}

const renderPagination = (page, totalPages) => {
    let pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';
    if (page > 1) {
        let previous = document.createElement('a');
        previous.innerHTML = 'Previous';
        previous.href = `?page=${page-1}`;
        pagination.appendChild(previous);
    }
    for (let i = 1; i <= totalPages; i++) {
        let pageLink = document.createElement('a');
        pageLink.innerHTML = i;
        pageLink.href = `?page=${i}`;
        if (i === page) {
            pageLink.classList.add('current');
        }
        pagination.appendChild(pageLink);
    }
    if (page < totalPages) {
        let next = document.createElement('a');
        next.innerHTML = 'Next';
        next.href = `?page=${page+1}`;
        pagination.appendChild(next);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let currentPage = new URLSearchParams(window.location.search).get('page') || 1;
    updatePosts(currentPage);
});