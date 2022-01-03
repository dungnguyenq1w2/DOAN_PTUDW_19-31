const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const createElement = (literal) => {
  const template = document.createElement('template');
  template.innerHTML = literal;
  return template.content.childNodes;
}

const getChildrenLock = (newState) => {
  const newChildren = [];

  if (newState === 'active') {
    const [svg] = createElement(`<svg xmlns="http://www.w3.org/2000/svg"  width="24"
                               height="24" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clip-rule="evenodd" />
    </svg>`);
    const [span] = createElement(`<span>Lock user</span>`);

    newChildren.push(svg, span);
  }
  else {
    const [svg] = createElement(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                       class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>`);
    const [span] = createElement(`<span>Unlock user</span>`);

    newChildren.push(svg, span);
  }

  return newChildren;
}

const handleLock = async (current, userId) => {
  const url = `/users/${userId}/lock`;
  const response = await fetch(
    url,
    {
      method: 'PUT'
    }
  );
  const data = await response.json();

  if (data.msg === 'success') {
    const elements = getChildrenLock(data.newState);
    current.replaceChildren();
    current.appendChild(elements[0]);
    current.appendChild(...createElement(`<span> </span>`));
    current.appendChild(elements[1]);

    const stateCell = current.parentElement.parentElement.getElementsByClassName('user__state')[0];
    stateCell.replaceChildren();
    stateCell.appendChild(...createElement(`<h5>${capitalizeFirstLetter(data.newState)}</h5>`));
  }
}