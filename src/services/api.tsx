const DATA_API = 'https://api.mercadolibre.com/sites/MLB/categories';
export async function getCategories() {
  const response = await fetch(DATA_API);
  const data = response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId: number, query: string) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const URL_API = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(URL_API);
  const result = await response.json();
  return result;
}

export async function getProductById(id: string) {
  const URL_API = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(URL_API);
  const result = await response.json();
  return result;
}

export async function getProductByQuery(query: string) {
  const URL_API = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(URL_API);
  const result = await response.json();
  return result;
}

export async function getProductByCategory(id: string) {
  const URL_API = `https://api.mercadolibre.com/sites/MLB/search?category=${id}`;
  const response = await fetch(URL_API);
  const result = await response.json();
  return result;
}
