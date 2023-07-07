import React from 'react';
import { ProductInfo } from '../types';
import ShoppingCartItens from '../components/ShoppingCartItens';

type ShoppingCardProps = {
  purchasedItens: ProductInfo[],
  setPurchased: (arg: ProductInfo[]) => void
};

function ShoppingCart({ purchasedItens, setPurchased }: ShoppingCardProps) {
  if (!purchasedItens.length) {
    return <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio.</p>;
  }
  return (
    <>
      {purchasedItens.map((iten: ProductInfo, index) => {
        return (
          <ShoppingCartItens
            key={ index }
            name={ iten.title }
            price={ iten.price }
            quantity={ iten.quantity }
            image={ iten.thumbnail }
            setPurchased={ setPurchased }
            purchasedItens={ purchasedItens }
          />
        );
      })}
    </>
  );
}
export default ShoppingCart;
