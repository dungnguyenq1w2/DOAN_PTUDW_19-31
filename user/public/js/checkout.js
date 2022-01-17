const formCheckOut = document.getElementById('form-checkout');

formCheckOut.addEventListener('submit', async event => {
  event.preventDefault();

  const url = '/checkout';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: document.getElementById('first-name').value,
      lastName: document.getElementById('last-name').value,
      country: document.getElementById('country').value,
      street: document.getElementById('street').value,
      number: document.getElementById('number').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      phone: document.getElementById('phone').value,
      note: document.getElementById('note').value
    })
  });

  const { msg } = await response.json();

  if (msg === 'success') {
    localStorage.removeItem('productsInCart');
    localStorage.totalCost = 0;
    localStorage.cartNumbers = 0;

    location.href = '/shoppingCart';
  } else {
    location.href = '/shoppingCart';
  }
})