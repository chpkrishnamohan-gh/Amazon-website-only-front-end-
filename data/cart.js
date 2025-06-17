export const cart = [];

export function addToCart(productId) {
  let matching = false;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matching = true;
      cartItem.quantity++;
    }
  });
  if (!matching) {
    cart.push({
      productId: productId,
      quantity: 1
    });
  }
}