import React from 'react';

function ShoppingCart(isFavorite: boolean) {
  if (isFavorite) {
    return <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio.</p>;
  }
  return <p>a</p>;
}
export default ShoppingCart;
