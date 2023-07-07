type ShoppingCartItensProps = {
  name: string,
  price: number,
  image: string,
  quantity?: number,
};

function ShoppingCartItens({ name, price, image, quantity = 0 }: ShoppingCartItensProps) {
  return (
    <div data-testid="product">
      <h4 data-testid="shopping-cart-product-name">{name}</h4>
      <img src={ image } alt="Foto do produto" />
      <p>{price}</p>
      <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
    </div>
  );
}

export default ShoppingCartItens;
