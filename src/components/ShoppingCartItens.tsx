import { ProductInfo } from '../types';

type ShoppingCartItensProps = {
  name: string,
  price: number,
  image: string,
  quantity?: number,
  purchasedItens: ProductInfo[],
  setPurchased: (arg: ProductInfo[]) => void
};

function ShoppingCartItens({
  name, price, image, quantity = 0, purchasedItens, setPurchased,
}: ShoppingCartItensProps) {
  const handleDelete = (itemName: string) => {
    const deletedItemIndex = purchasedItens.findIndex((item) => item.title === itemName);
    purchasedItens.splice(deletedItemIndex, 1);
    setPurchased(purchasedItens);
    console.log(deletedItemIndex);
    console.log(purchasedItens);
  };

  return (
    <div data-testid="product">
      <button
        data-testid="remove-product"
        onClick={ () => handleDelete(name) }
      >
        X
      </button>
      <h4 data-testid="shopping-cart-product-name">{name}</h4>
      <img src={ image } alt="Foto do produto" />
      <p>{price}</p>
      <button data-testid="product-increase-quantity">+</button>
      <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
      <button data-testid="product-decrease-quantity">-</button>
    </div>
  );
}

export default ShoppingCartItens;
