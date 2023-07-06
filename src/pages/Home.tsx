import { useState } from 'react';
import { getProductByQuery } from '../services/api';
import { ProductInfo } from '../types';
import ProductCard from '../components/ProductCard';

function Home() {
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
      .map(({ title, price, thumbnail, id }: ProductInfo) => {
        return {
          title,
          price,
          thumbnail,
          id,
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
      {searched && (productsList.length
        ? productsList.map((item) => {
          return (<ProductCard
            name={ item.title }
            image={ item.thumbnail }
            price={ item.price }
            key={ item.id }
          />);
        }) : <p>Nenhum produto foi encontrado</p>)}
    </>
  );
}

export default Home;
