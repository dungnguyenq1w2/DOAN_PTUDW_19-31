const commentsList = document.getElementById('comments');
const btnComment = document.getElementById('btn-comment');

const createElement = (literal) => {
  const template = document.createElement('template');
  template.innerHTML = literal;
  return template.content.childNodes;
}

const renderComments = (comments) => {
  commentsList.replaceChildren();

  for (const comment of comments) {
    const [commentTag] = createElement(
      `<div class="comment__box">
      <div class="comment__customer__info">
        <img src="${comment.user.avatar}" alt="" />
        <div>
          <h4>${comment.user.name}</h4>
          <span>${(new Date(comment.createdAt)).toLocaleString()}</span>
        </div>
      </div>
      <div class="comment__message">
        <p>${comment.content}</p>
      </div>
    </div>`
    );

    commentsList.appendChild(commentTag);
  }
}

(async () => {
  const url = new URL(location.href);
  const cakeId = url.pathname.split('/cakes/')[1];

  const fetchUrl = `/comments?cake=${cakeId}`;
  const response = await fetch(
    fetchUrl,
    {
      method: 'GET'
    }
  );

  const { comments, pagination } = await response.json();

  renderComments(comments);
})();

const handleComment = async (cakeId) => {
  const url = `/comments?cake=${cakeId}`;

  const response = await fetch(url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: document.getElementById('comment-input').value
      })
    }
  );

  const { comments, pagination } = await response.json();

  renderComments(comments);
};