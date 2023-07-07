import { useState } from 'react';
import { ProductInfo } from '../types';

type ProductCardProps = {
  name: string,
  price: number,
  image: string,
  purchasedItens?: ProductInfo[]
  setPurchased?: (arg: ProductInfo[]) => void
};

function ProductCard({ name,
  price, image, purchasedItens = [], setPurchased = () => {} }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleClick = () => {
    setQuantity(quantity + 1);
    const foundItenIndex = purchasedItens.findIndex((iten) => iten.title === name);
    if (foundItenIndex === -1) {
      setPurchased([...purchasedItens, {
        title: name,
        price,
        thumbnail: image,
        quantity,
      }]);
    } else {
      purchasedItens.splice(foundItenIndex, 1);
      setPurchased([...purchasedItens, {
        title: name,
        price,
        thumbnail: image,
        quantity,
      }]);
    }
  };

  return (
    <div data-testid="product">
      <h4>{name}</h4>
      <img src={ image } alt="Foto do produto" />
      <p>{price}</p>
      <button
        data-testid="product-add-to-cart"
        onClick={ handleClick }
      >
        Comprar
      </button>
    </div>
  );
}

export default ProductCard;
