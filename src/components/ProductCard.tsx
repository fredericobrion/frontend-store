type ProductCardProps = {
  name: string,
  price: number,
  image: string,
};

function ProductCard({ name, price, image }: ProductCardProps) {
  return (
    <div data-testid="product">
      <h4>{name}</h4>
      <img src={ image } alt="Foto do produto" />
      <p>{price}</p>
    </div>
  );
}

export default ProductCard;
