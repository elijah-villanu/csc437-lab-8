import { toHtmlElement } from "./toHtmlElement.mjs";

const PRODUCTS = [
  // Imagine this data came in via the server
  {
    name: "Elder Chocolate Truffles, 2oz",
    description: "The best of the best in chocolate truffles.",
    imageSrc: "https://placehold.co/200x200",
    price: 10,
    numInCart: 2,
  },
  {
    name: "Jelly Belly Jelly Beans, 100 count",
    description: "Not for planting.",
    imageSrc: "https://placehold.co/200x200",
    price: 5,
    numInCart: 1,
  },
  {
    name: "Kettle Chips, 8oz",
    description: "Delicious and unhealthy.",
    imageSrc: "https://placehold.co/200x200",
    price: 3,
    numInCart: 0,
  },
  {
    name: "Carrots, 2lb",
    description: "Delicious and healthy.",
    imageSrc: "https://placehold.co/200x200",
    price: 2,
    numInCart: 0,
  },
];

/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
  const productString = `<article>
                <img src="${product.imageSrc}" alt="${product.name}" />
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="price">$${product.price}</p>
                    <div><button class="buy-button">Add to cart</button> <span class="num-in-cart">${product.numInCart}</span></div>
                </div>
            </article>`;
  const productHTML = toHtmlElement(productString);
  const productList = document.querySelector(".product-list");

  //Add to cart button functionality (adding to doc fragment before appending)
  const article = productHTML.firstElementChild;
  const buyButton = article.querySelector(".buy-button");

  buyButton.addEventListener("click", function (event) {
    product.numInCart++;
    rerenderAllProducts();
    rerenderCart();
  });

  productList.append(productHTML);
}

/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
  /*
    1. remove all <article>s
    2. recreate them using the data in PRODUCTS
    3. modify the re-creation so it uses shouldProductBeVisible() (details are near the bottom of the lab directions)

    You can remove and recreate the heading element if it makes things easier.
     */

  const productList = document.querySelector(".product-list");

  // Removes all article elements currently rendered except for header
  while (productList.children.length > 1) {
    productList.removeChild(productList.lastElementChild);
  }

  //Rerender all product cards given the data (PRODUCTS array)
  for (let card of PRODUCTS) {
    if (shouldProductBeVisible(card)) {
      renderProductCard(card);
    }
  }
}

/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
  /*
    1. remove all card items
    2. recreate them and the remove buttons based off the data in PRODUCTS
     */
  const cartSection = document.querySelector(".cart");
  while (cartSection.children.length > 1) {
    cartSection.removeChild(cartSection.lastElementChild);
  }

  //Rerender div and button
  const cartItems = toHtmlElement(`<div class="cart-items"></div>`);
  const checkoutButton = toHtmlElement(
    `<button class="buy-button">Check out</button>`
  );
  cartSection.append(cartItems);
  cartSection.append(checkoutButton);

  //Rerender cart items in the cart-items div
  //Add to cart only if quantity > 0
  const cartItemsList = document.querySelector(".cart-items");
  for (let item of PRODUCTS) {
    if (item.numInCart !== 0) {
      const cartItemString = `<p>${item.name} x${item.numInCart}</p>
      <button class="remove-button">Remove</button>`;
      const cartItem = toHtmlElement(cartItemString);

      //Add remove button functionality
      const removeButton = cartItem.lastElementChild;
      removeButton.addEventListener("click", () => {
        item.numInCart--;
        rerenderAllProducts();
        rerenderCart();
      });
      cartItemsList.append(cartItem);
    }
  }
}

const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");
/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {
  const price = product.price;
  const minPrice = Number.parseFloat(minPriceInput.value);
  const maxPrice = Number.parseFloat(maxPriceInput.value);
  if (isNaN(minPrice) || price >= minPrice) {
    if (isNaN(maxPrice) || price <= maxPrice) {
      return true;
    }
  }
  return false;
}

//Initial screen render
rerenderAllProducts();
rerenderCart();

//Filter functionality
minPriceInput.addEventListener("change",()=>{
    rerenderAllProducts()
    rerenderCart()
})
maxPriceInput.addEventListener("change",() =>{
    rerenderAllProducts()
    rerenderCart()
})