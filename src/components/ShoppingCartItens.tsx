import { ProductInfo } from '../types';

type ShoppingCartItensProps = {
  name: string,
  price: number,
  image: string,
  quantity?: number,
  purchasedItens: ProductInfo[],
  setPurchased: (arg: ProductInfo[]) => void,
  quantityTotal: number,
  setQuantity: (arg: number) => void,
};

function ShoppingCartItens({
  name, price, image, quantity = 0, purchasedItens, setPurchased,
  setQuantity, quantityTotal }: ShoppingCartItensProps) {
  const handleDelete = (itemName: string) => {
    const deletedItemIndex = purchasedItens.findIndex((item) => item.title === itemName);
    console.log(purchasedItens[deletedItemIndex].quantity);
    setQuantity(quantityTotal - purchasedItens[deletedItemIndex].quantity);
    purchasedItens.splice(deletedItemIndex, 1);
    setPurchased([...purchasedItens]);
  };

  const handleIncrease = (itemName: string) => {
    const alterItemIndex = purchasedItens.findIndex((item) => item.title === itemName);
    const alterItem = purchasedItens[alterItemIndex];
    if (alterItem.quantity < alterItem.available_quantity) {
      alterItem.quantity = quantity + 1;
    }
    setPurchased([...purchasedItens]);
    setQuantity(quantityTotal + 1);
  };

  const handleDecrease = (itemName: string) => {
    const alterItemIndex = purchasedItens.findIndex((item) => item.title === itemName);
    if (quantity > 1) {
      purchasedItens[alterItemIndex].quantity = quantity - 1;
      setPurchased([...purchasedItens]);
    }
    setQuantity(quantityTotal - 1);
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
      <button
        data-testid="product-increase-quantity"
        onClick={ () => handleIncrease(name) }
      >
        +
      </button>
      <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
      <button
        data-testid="product-decrease-quantity"
        onClick={ () => handleDecrease(name) }
      >
        -
      </button>
    </div>
  );
}

export default ShoppingCartItens;
