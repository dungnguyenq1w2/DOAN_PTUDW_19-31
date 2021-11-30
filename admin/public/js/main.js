const selectSort = document.getElementById('select-sort');
const inputSearch = document.getElementById('input-search');

const handleQuery = (event) => {
  let url = window.location.href;
  const tag = event.target;

  if (url.includes('page='))
    url = url.substring(0, url.indexOf('page=') - 1);

  if (url.includes('?')) {
    if (!url.includes(tag.name)) {
      url += `&${tag.name}=${tag.value}`;
    }
    else {
      const arr = url.split(`${tag.name}=`);
      url = arr[0] + `${tag.name}=${tag.value}`;

      if (arr[1].includes('&')) {
        url += arr[1].substr(arr[1].indexOf('&'));
      }
    }
  }
  else {
    url += `?${tag.name}=${tag.value}`;
  }

  location.href = url;
}

selectSort.addEventListener('change', handleQuery);

inputSearch.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    handleQuery(event);
  }
});