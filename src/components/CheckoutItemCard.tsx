import { ProductInfo } from '../types';

function CheckoutItemCard({ title, thumbnail, price, quantity }: ProductInfo) {
  return (
    <div>
      <h5>{title}</h5>
      <img src={ thumbnail } alt="Imagem do produto" />
      <h6>{price}</h6>
      <p>{quantity}</p>
    </div>
  );
}

export default CheckoutItemCard;
