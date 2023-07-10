// Requisito 6 feito por Andrew e Frederico

import { useState } from 'react';
import { getProductByQuery } from '../services/api';
import { ProductInfo } from '../types';
import ProductCard from '../components/ProductCard';
import Categories from '../components/Categorias';

type HomeProps = {
  purchasedItens: ProductInfo[]
  setPurchased: (arg: ProductInfo[]) => void
};

function Home({ purchasedItens, setPurchased }: HomeProps) {
  const [search, setSearch] = useState('');
  const [productsList, setProductsList] = useState<ProductInfo[]>([]);
  const [searched, setSearched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleClick = async (query: string) => {
    const returnedItens = await getProductByQuery(query);
    const filteredInfoItens = returnedItens.results
      .map(({ title, price, thumbnail, id, available_quantity }: ProductInfo) => {
        return {
          title,
          price,
          thumbnail,
          id,
          available_quantity,
        };
      });
    setProductsList(filteredInfoItens);
    setSearched(true);
  };

  return (
    <>
      <input
        onChange={ handleChange }
        value={ search }
        data-testid="query-input"
        type="text"
      />
      <button
        data-testid="query-button"
        onClick={ () => handleClick(search) }
      >
        Pesquisar
      </button>
      <h3
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h3>
      <Categories searched={ setSearched } productsList={ setProductsList } />
      {searched && (productsList.length
        ? productsList.map((item) => {
          return (<ProductCard
            name={ item.title }
            image={ item.thumbnail }
            price={ item.price }
            purchasedItens={ purchasedItens }
            setPurchased={ setPurchased }
            key={ item.id }
            id={ item.id }
            available={ item.available_quantity }
          />);
        }) : <p>Nenhum produto foi encontrado</p>)}
    </>
  );
}

export default Home;
