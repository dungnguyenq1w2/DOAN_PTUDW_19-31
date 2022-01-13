const commentsList = document.getElementById("comments");
const commentInput = document.getElementById("comment-input");
const paginationBar = document.getElementById("pagination-bar");

const createElement = (literal) => {
  const template = document.createElement("template");
  template.innerHTML = literal;
  return template.content.childNodes;
};

const renderComments = (comments) => {
  commentsList.replaceChildren();

  for (const comment of comments) {
    const [commentTag] = createElement(
      `<div class="comment__box">
      <img src="${comment.user.avatar}" alt="" />
      <div class="comment__content">
      <div class="comment__customer__info">
          <h4>${comment.user.name}</h4>
          <span>${new Date(comment.createdAt).toLocaleString()}</span>
      </div>
      <div class="comment__message">
        <p>${comment.content}</p>
      </div>
      </div>
    </div>`
    );

    commentsList.appendChild(commentTag);
  }
};

const handleLoadComment = async (cakeId, page) => {
  for (let i = 0; i < paginationBar.childElementCount; i++) {
    paginationBar.children[i].classList.remove("active");

    if (page - 1 === i) {
      paginationBar.children[i].classList.add("active");
    }
  }

  const fetchUrl = `/comments?cake=${cakeId}&page=${page}`;
  const response = await fetch(fetchUrl, {
    method: "GET",
  });

  const { comments, pagination } = await response.json();

  renderComments(comments);
};

(async () => {
  const url = new URL(location.href);
  const cakeId = url.pathname.split("/cakes/")[1];

  const fetchUrl = `/comments?cake=${cakeId}`;
  const response = await fetch(fetchUrl, {
    method: "GET",
  });

  const { comments, pagination } = await response.json();

  renderComments(comments);

  for (let i = 0; i < pagination.num; i++) {
    const literal =
      i === 0
        ? `<a class='active' onclick='handleLoadComment("${cakeId}", ${
            i + 1
          })'>${i + 1}</a>`
        : `<a onclick='handleLoadComment("${cakeId}", ${i + 1})'>${i + 1}</a>`;

    const [number] = createElement(literal);
    paginationBar.appendChild(number);
  }
})();

const handleComment = async (cakeId) => {
  const url = `/comments?cake=${cakeId}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: commentInput.value,
    }),
  });

  const { comments, pagination } = await response.json();

  renderComments(comments);

  commentInput.value = "";

  for (let i = 0; i < paginationBar.childElementCount; i++) {
    paginationBar.children[i].classList.remove("active");
  }
  paginationBar.children[0].classList.add("active");
};
