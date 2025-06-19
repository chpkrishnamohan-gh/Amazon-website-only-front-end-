export let cart = [{
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 2
},{
    productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity : 1
}];

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

export function removeFromCart(productId){
  const new_cart = [];
  cart.forEach((cartItem)=>{
    if(cartItem.productId != productId){
      new_cart.push(cartItem);
    }
  });
  cart = new_cart; 
}