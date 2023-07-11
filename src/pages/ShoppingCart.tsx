import React from 'react';
import { Link } from 'react-router-dom';
import { ProductInfo } from '../types';
import ShoppingCartItens from '../components/ShoppingCartItens';

type ShoppingCardProps = {
  purchasedItens: ProductInfo[],
  setPurchased: (arg: ProductInfo[]) => void,
  setQuantity: (arg: number) => void,
  quantityTotal: number,
};

function ShoppingCart({ purchasedItens, setPurchased, setQuantity, quantityTotal }:
ShoppingCardProps) {
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
            setQuantity={ setQuantity }
            quantityTotal={ quantityTotal }
          />
        );
      })}
      <Link
        data-testid="checkout-products"
        to="/shoppingcart/checkout"
      >
        Finalizar Compra
      </Link>
    </>
  );
}
export default ShoppingCart;
