import { useEffect, useState } from 'react';
import { getCategories } from '../services/api';
import { CategoriesTypes } from '../types';
import Loading from './Loading';

function Categories() {
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

  if (isLoading) return <Loading />;

  return (
    <aside>
      <h1>Categorias</h1>
      {apiCategories.length && <div>
        { apiCategories.map((item) => (
          <button data-testid="category" key={ item.data.id }>{ item.data.name }</button>
        )) }
      </div> }
    </aside>
  );
}

export default Categories;
