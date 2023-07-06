import { useEffect, useState } from 'react';
import { getCategories, getProductByCategory } from '../services/api';
import { CategoriesTypes, ProductInfo } from '../types';
import Loading from './Loading';

type CategoriesProps = {
  searched: (arg: boolean) => void,
  productsList: (arg: ProductInfo[]) => void,
};

function Categories({ searched, productsList }: CategoriesProps) {
  const [apiCategories, setApiCategories] = useState<CategoriesTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const apitResult = async () => {
      setIsLoading(true);
      const dataAPI = await getCategories();
      setApiCategories(dataAPI);
      setIsLoading(false);
    };
    apitResult();
  }, []);

  const handleClick = async (itemId: string) => {
    searched(true);
    const itensByCategory = await getProductByCategory(itemId);
    console.log(itensByCategory);
    const filteredInfoItens = itensByCategory.results
      .map(({ title, price, thumbnail, id }: ProductInfo) => {
        return {
          title,
          price,
          thumbnail,
          id,
        };
      });
    productsList(filteredInfoItens);
  };

  if (isLoading) return <Loading />;

  return (
    <aside>
      <h1>Categorias</h1>
      <div>
        { apiCategories.map((item) => (
          <button
            data-testid="category"
            key={ item.id }
            onClick={ () => handleClick(item.id) }
          >
            { item.name }
          </button>
        )) }
      </div>
    </aside>
  );
}

export default Categories;
