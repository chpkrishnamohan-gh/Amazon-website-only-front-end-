import { cart,removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {formatMoney} from '../scripts/money.js';
import {deliveryOptions} from '../data/deliveryOptions.js'

let cartCode = "";

cart.forEach((cartItem => {

  const productId = cartItem.productId;

  let matched;

  products.forEach((product) => {
    if (product.id === productId) {
      matched = product;
    }
  });

  cartCode += `
        <div class="cart-item-container js-cart-item-container-${matched.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matched.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matched.name}
                </div>
                <div class="product-price">
                  ${formatMoney(matched.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id = ${matched.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matched.id)}
              </div>
            </div>
          </div>
    `;
}));

function deliveryOptionsHTML(matchedId){
  let deliveryOptCode = "";
  deliveryOptions.forEach((dOpt) => {
    let date = dayjs().add(dOpt.deliveryDays,'days').format("dddd, MMMM D");
    let priceString = "";
    if(dOpt.priceCents === 0) priceString = "FREE Shipping";
    else{
      priceString = "$" +  formatMoney(dOpt.priceCents) + " - Shipping";
    }
    let checkedString = '';
    if(dOpt.priceCents === 0) checkedString = "checked";
    deliveryOptCode += `
    <div class="delivery-option">
      <input type="radio" ${checkedString}
        class="delivery-option-input"
        name="delivery-option-${matchedId}">
      <div>
        <div class="delivery-option-date">
          ${date}
        </div>
        <div class="delivery-option-price">
          ${priceString}
        </div>
      </div>
    </div>`
  });
  return deliveryOptCode;
}

document.querySelector('.js-order-summary').innerHTML = cartCode;


document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
  });
});