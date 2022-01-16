const btnSignIn = document.getElementById('btn-sign-in');

btnSignIn.addEventListener('click', async () => {
  const url = '/signIn';

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      localStorage: JSON.stringify(localStorage)
    }),
  });

  if (response.url.includes('signIn'))
    location.href = '/signIn';

  const { wares } = await response.json();

  localStorage.removeItem('productsInCart');

  const productsInCart = {};
  let totalCost = 0;
  let cartNumbers = 0;

  for (const ware of wares) {
    totalCost += ware.cake.price * ware.quantity;
    cartNumbers += ware.quantity;

    productsInCart[ware.cake._id] = {
      id: ware.cake._id,
      name: ware.cake.name,
      price: ware.cake.price,
      img: ware.cake.figure,
      inCart: ware.quantity
    };
  }

  localStorage.productsInCart = JSON.stringify(productsInCart);
  localStorage.totalCost = totalCost;
  localStorage.cartNumbers = cartNumbers;

  location.href = '/';
});