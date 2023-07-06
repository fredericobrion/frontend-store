import Categories from '../components/Categorias';

function Home() {
  return (
    <>
      <input type="text" />
      <h3
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h3>
      <Categories />
    </>
  );
}

export default Home;
