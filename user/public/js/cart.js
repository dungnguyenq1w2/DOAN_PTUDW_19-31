// Button Add to carts in Shop
const buttonAddCarts = document.querySelectorAll(".product__cart__btn");
const nodeListProducts = document.querySelectorAll(".product");

const arrayProducts = Array.from(nodeListProducts);
const products = arrayProducts.map((e) => {
  return {
    id: e.querySelector("#product__id").textContent,
    name: e.querySelector("#product__name").textContent,
    price: parseInt(e.querySelector("#product__price").textContent),
    img: e.querySelector(".product__img img").src,
    inCart: 0,
  };
});

// Add event click for button Add to cart
for (let i = 0; i < buttonAddCarts.length; i++) {
  buttonAddCarts[i].addEventListener("click", () => {
    addProduct(products[i]);
    totalCost(products[i]);
  });
}

// Button Add to cart in Product Detail
const nodeProductDetail = document.querySelector(".product__detail");
if (nodeProductDetail) {
  const buttonAddCartsDetail = nodeProductDetail.querySelector(
    "#product__cart__btn"
  );
  const productDetail = {
    id: nodeProductDetail.querySelector("#product__id").textContent,
    name: nodeProductDetail.querySelector(".product__detail__info h3")
      .textContent,
    price: parseInt(
      nodeProductDetail.querySelector("#product__detail__info__price")
        .textContent
    ),
    img: nodeProductDetail.querySelector(".product__detail__img img").src,
    inCart: 0,
  };
  buttonAddCartsDetail.addEventListener("click", () => {
    addProduct(productDetail);
    totalCost(productDetail);
  });
}

const onLoadCartNumbers = () => {
  const productNumbers = parseInt(localStorage.getItem("cartNumbers"));

  if (productNumbers) {
    document.querySelector(".header__cart__amount").textContent =
      productNumbers;
  }
};

const addProduct = (product) => {
  const productNumbers = parseInt(localStorage.getItem("cartNumbers"));

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".header__cart__amount").textContent =
      productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".header__cart__amount").textContent = 1;
  }

  setItems(product);
};

const setItems = (product) => {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));

  if (cartItems != null) {
    if (cartItems[product.id] == undefined) {
      cartItems = {
        ...cartItems,
        [product.id]: product,
      };
    }
    cartItems[product.id].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.id]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
};

const totalCost = (product) => {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
};

const displayCart = () => {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let cartContainer = document.querySelector("#product__cart__container");
  if (cartItems && cartContainer) {
    cartContainer.innerHTML = `
    <table class="table">
        <tr class="table__head">
            <th><h5>PRODUCT</h5></th>
            <th><h5>QUANTITY</h5></th>
            <th><h5>TOTAL</h5></th>
        </tr>`;
    Object.values(cartItems).map((e) => {
      cartContainer.innerHTML += `
        <tbody class="row__cart__item">
            <tr>
                <td class="table__product">
                <span id="cart__id" style="display: none;">${e.id}</span>
                    <div class="table__product__img">
                        <img src="${e.img}" alt="${e.name}">
                    </div>
                     <div class="table__product__details">
                        <h6 id="table__product__name">${e.name}</h6>
                        <h5>$ <span id="table__product__price">${
                          e.price
                        }</span></h5>
                    </div>
                </td>
                <td class="table__quantity">
                    <div class="table__quantity__adjust">
                        <button type="button" class="decrease">-</button>
                        <input type="number" class="quantity-input" id="table__product__quantity" value="${
                          e.inCart
                        }">
                        <button type="button" class="increase">+</button>
                    </div>
                </td>
                <td class="table__total"><h5>$ <span id="table__product__total">${
                  e.price * e.inCart
                }</span></h5></td>
                <td class="table__remove-product">
                    <div class="table__remove-product__img">
                        <img src="/img/close-icon.png" alt="Close icon">
                    </div>
                </td>
            </tr>
        </tbody>
     `;
    });
  }

  const total = document.querySelector("#cart__total");
  if (total) {
    total.innerText = `$ ${localStorage.getItem("totalCost")}`;
  }

  const carts = document.querySelectorAll(".row__cart__item");
  for (let i = 0; i < carts.length; i++) {
    carts[i].querySelector(".decrease").addEventListener("click", () => {
      decreaseCart(cartItems, carts[i]);
    });
    carts[i].querySelector(".increase").addEventListener("click", () => {
      increaseCart(cartItems, carts[i]);
    });
    carts[i]
      .querySelector(".table__remove-product__img img")
      .addEventListener("click", () => {
        deleteCart(cartItems, carts[i]);
        displayCart();
      });
  }
};

const decreaseCart = (cartItems, cart) => {
  if (cart.querySelector("#table__product__quantity").value == 1) {
    return;
  }
  cart.querySelector("#table__product__quantity").value--;
  let cartId = cart.querySelector("#cart__id").textContent;

  if (cartItems != null) {
    if (cartItems[cartId] == undefined) {
      cartItems = {
        ...cartItems,
        [cartId]: cartItems[cartId],
      };
    }
    cartItems[cartId].inCart--;
  } else {
    cartItems = {
      [cartId]: cartItems[cartId],
    };
  }

  cart.querySelector("#table__product__total").innerText =
    cartItems[cartId].inCart * cartItems[cartId].price;

  const productNumbers = parseInt(localStorage.getItem("cartNumbers"));
  localStorage.setItem("cartNumbers", productNumbers - 1);
  document.querySelector(".header__cart__amount").textContent =
    productNumbers - 1;

  let cartCost = localStorage.getItem("totalCost");
  localStorage.setItem("totalCost", cartCost - cartItems[cartId].price);
  document.querySelector("#cart__total").innerHTML = `$ ${localStorage.getItem(
    "totalCost"
  )}`;

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
};

const increaseCart = (cartItems, cart) => {
  cart.querySelector("#table__product__quantity").value++;
  let cartId = cart.querySelector("#cart__id").textContent;

  if (cartItems != null) {
    if (cartItems[cartId] == undefined) {
      cartItems = {
        ...cartItems,
        [cartId]: cartItems[cartId],
      };
    }
    cartItems[cartId].inCart++;
  } else {
    cartItems = {
      [cartId]: cartItems[cartId],
    };
  }

  cart.querySelector("#table__product__total").innerText =
    cartItems[cartId].inCart * cartItems[cartId].price;

  const productNumbers = parseInt(localStorage.getItem("cartNumbers"));
  localStorage.setItem("cartNumbers", productNumbers + 1);
  document.querySelector(".header__cart__amount").textContent =
    productNumbers + 1;

  let cartCost = parseInt(localStorage.getItem("totalCost"));
  localStorage.setItem("totalCost", cartCost + cartItems[cartId].price);
  document.querySelector("#cart__total").innerHTML = `$ ${localStorage.getItem(
    "totalCost"
  )}`;

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
};

const deleteCart = (cartItems, cart) => {
  let cartId = cart.querySelector("#cart__id").textContent;

  cart.querySelector("#table__product__total").innerText =
    parseInt(cart.querySelector("#table__product__total").textContent) -
    cartItems[cartId].inCart * cartItems[cartId].price;

  const productNumbers = parseInt(localStorage.getItem("cartNumbers"));
  localStorage.setItem(
    "cartNumbers",
    productNumbers - cartItems[cartId].inCart
  );
  document.querySelector(".header__cart__amount").textContent =
    productNumbers - cartItems[cartId].inCart;

  let cartCost = parseInt(localStorage.getItem("totalCost"));
  localStorage.setItem(
    "totalCost",
    cartCost - cartItems[cartId].inCart * cartItems[cartId].price
  );
  document.querySelector("#cart__total").innerText = `$ ${localStorage.getItem(
    "totalCost"
  )}`;

  delete cartItems[cartId];

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
};

onLoadCartNumbers();
displayCart();
