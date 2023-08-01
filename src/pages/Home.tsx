// Requisito 6 feito por Andrew e Frederico

import { useState } from 'react';
import { getProductByQuery } from '../services/api';
import { ProductInfo } from '../types';
import ProductCard from '../components/ProductCard';
import Categories from '../components/Categorias';
import styles from '../styles/home.module.css';
import searchLogo from '../images/search.svg';

type HomeProps = {
  purchasedItens: ProductInfo[]
  setPurchased: (arg: ProductInfo[]) => void,
  setQuantity: (arg: number) => void,
  quantityTotal: number,
};

function Home({ purchasedItens, setPurchased, setQuantity, quantityTotal }: HomeProps) {
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
      <header className={ styles.header }>
        <div>
          <input
            onChange={ handleChange }
            value={ search }
            data-testid="query-input"
            placeholder="Digite o que você busca"
            type="text"
          />
          <button
            data-testid="query-button"
            onClick={ () => handleClick(search) }
          >
            <img src={ searchLogo } alt="Search logo" />
          </button>
        </div>
        <h1>
          FRONT-END
          <span>
            online store
          </span>
        </h1>
      </header>
      <main className={ styles.main }>
        <Categories searched={ setSearched } productsList={ setProductsList } />
        {!searched && <div>
          <h2>VOCÊ AINDA NÃO REALIZOU UMA BUSCA</h2>
          <h3
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        </div>}
        {searched && (productsList.length
          ? <div className={ styles.productContainer }>
            {
              productsList.map((item) => {
                return (<ProductCard
                  name={ item.title }
                  image={ item.thumbnail }
                  price={ item.price }
                  shipping={ item.shipping }
                  purchasedItens={ purchasedItens }
                  setPurchased={ setPurchased }
                  setQuantityTotal={ setQuantity }
                  quantityTotal={ quantityTotal }
                  key={ item.id }
                  id={ item.id }
                  available={ item.available_quantity }
                />);
              })
              }
          </div>
          : <div>
            <h2>Nenhum produto foi encontrado</h2>
            <h3>Digite outro termo de pesquisa ou escolha uma categoria</h3>
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
