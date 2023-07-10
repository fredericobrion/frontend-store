export type ProductInfo = {
  title: string,
  price: number,
  thumbnail: string,
  id?: string,
  quantity: number,
};

export type CategoriesTypes = {
  id: string,
  name: string,
};

export type InputVerification = {
  userName: boolean,
  email: boolean,
  cpf: boolean,
  phone: boolean,
  cep: boolean,
  address: boolean,
  payment: boolean,
};
