import { useState } from 'react';
import { ProductInfo } from '../types';
import CheckoutItemCard from '../components/CheckoutItemCard';

type PaymentProps = {
  purchasedItens: ProductInfo[],
};
type UserInforTypes = {
  nome: string,
  email: string,
  cpf: string,
  telefone: string
  cep: string,
  endereço: string,
};

const INITIAL_INFOS = {
  nome: '',
  email: '',
  cpf: '',
  telefone: '',
  cep: '',
  endereço: '',
};

function PagePayments({ purchasedItens }: PaymentProps) {
  const [userInfo, setUserInfo] = useState<UserInforTypes>(INITIAL_INFOS);
  const { nome, email, cpf, telefone, cep, endereço } = userInfo;
  const [isFilled, setIsFilled] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  return (
    <div>
      <div>
        {purchasedItens.map((item: ProductInfo) => {
          return (
            <CheckoutItemCard
              key={ item.title }
              title={ item.title }
              thumbnail={ item.thumbnail }
              price={ item.price }
              quantity={ item.quantity }
            />
          );
        })}
      </div>

      <form>
        <label htmlFor="nome">
          Nome
          <input
            value={ nome }
            onChange={ handleChange }
            data-testid="checkout-fullname"
            required
            name="nome"
            type="text"
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            data-testid="checkout-email"
            required
            name="email"
            type="email"
            value={ email }
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="cpf">
          CPF
          <input
            value={ cpf }
            required
            name="cpf"
            type="number"
            data-testid="checkout-cpf"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="telefone">
          Numero de Telefone
          <input
            value={ telefone }
            required
            name="telefone"
            type="number"
            data-testid="checkout-phone"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="cep">
          CEP
          <input
            value={ cep }
            required
            name="cep"
            type="number"
            data-testid="checkout-cep"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="endereço">
          Endereço
          <input
            value={ endereço }
            required
            name="endereço"
            type="text"
            data-testid="checkout-address"
            onChange={ handleChange }
          />
        </label>
        <div>

          <label htmlFor="ticket">
            <input
              data-testid="ticket-payment"
              id="ticket"
              name="payment-method"
              type="radio"
            />
            Boleto
          </label>

          <label htmlFor="visa-card">
            <input
              id="visa-card"
              name="payment-method"
              type="radio"
              data-testid="visa-payment"
            />
            Visa
          </label>

          <label htmlFor="masterCard-card">
            <input
              checked={ false }
              data-testid="master-payment"
              id="masterCard-card"
              name="payment-method"
              type="radio"
            />
            MasterCard
          </label>

          <label htmlFor="eloCard">
            <input
              data-testid="elo-payment"
              id="eloCard"
              name="payment-method"
              type="radio"
            />
            Elo
          </label>
        </div>
        <button data-testid="checkout-btn" type="submit">Finalizar Compra</button>
      </form>

      {isFilled && <p data-testid="error-msg">Campos inválidos</p>}
    </div>
  );
}

export default PagePayments;
