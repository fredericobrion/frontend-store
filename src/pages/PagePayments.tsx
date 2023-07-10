import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { ProductInfo, InputVerification } from '../types';
import CheckoutItemCard from '../components/CheckoutItemCard';

type PaymentProps = {
  purchasedItens: ProductInfo[],
  setPurchased: (arg: ProductInfo[]) => void
};
type UserInforTypes = {
  userName: string,
  email: string,
  cpf: string,
  phone: string
  cep: string,
  address: string,
  payment: string,
};

const INITIAL_INFOS = {
  userName: '',
  email: '',
  cpf: '',
  phone: '',
  cep: '',
  address: '',
  payment: '',
};

const INITIAL_VERIFICATION = {
  userName: false,
  email: false,
  cpf: false,
  phone: false,
  cep: false,
  address: false,
  payment: true,
};

function PagePayments({ purchasedItens, setPurchased }: PaymentProps) {
  const [userInfo, setUserInfo] = useState<UserInforTypes>(INITIAL_INFOS);
  const { userName, email, cpf, phone, cep, address } = userInfo;
  const [checkedStatus, setCheckedStatus] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<InputVerification>(INITIAL_VERIFICATION);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.length > 0) {
      setIsValid({
        ...isValid,
        [name]: true,
      });
    } else {
      setIsValid({
        ...isValid,
        [name]: false,
      });
    }
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleClickRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;

    setUserInfo({
      ...userInfo,
      payment: id,
    });
  };

  const handleclickButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const allInputsOk = Object.values(isValid).every((input) => input === true);
    setCheckedStatus(allInputsOk);
    if (allInputsOk) setPurchased([]);
    if (allInputsOk) navigate('/');
  };

  return (
    <div>
      <div>
        {purchasedItens.map((item: ProductInfo) => {
          const { id, title, thumbnail, price, quantity } = item;
          return (
            <CheckoutItemCard
              key={ title }
              title={ title }
              thumbnail={ thumbnail }
              price={ price }
              quantity={ quantity }
            />
          );
        })}
      </div>

      <form>
        <label htmlFor="userName">
          Nome
          <input
            value={ userName }
            onChange={ handleChange }
            data-testid="checkout-fullname"
            required
            name="userName"
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
            type="text"
            data-testid="checkout-cpf"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="phone">
          Numero de Telefone
          <input
            value={ phone }
            required
            name="phone"
            type="text"
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
            type="text"
            data-testid="checkout-cep"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="address">
          Endereço
          <input
            value={ address }
            required
            name="address"
            type="text"
            data-testid="checkout-address"
            onChange={ handleChange }
          />
        </label>
        <div>

          <label htmlFor="ticket">
            <input
              checked
              onChange={ handleClickRadio }
              data-testid="ticket-payment"
              id="ticket"
              name="payment-method"
              type="radio"
            />
            Boleto
          </label>

          <label htmlFor="visa-card">
            <input
              onChange={ handleClickRadio }
              id="visa-card"
              name="payment-method"
              type="radio"
              data-testid="visa-payment"
            />
            Visa
          </label>

          <label htmlFor="masterCard-card">
            <input
              onChange={ handleClickRadio }
              data-testid="master-payment"
              id="masterCard-card"
              name="payment-method"
              type="radio"
            />
            MasterCard
          </label>

          <label htmlFor="eloCard">
            <input
              onChange={ handleClickRadio }
              data-testid="elo-payment"
              id="eloCard"
              name="payment-method"
              type="radio"
            />
            Elo
          </label>
        </div>
        <button
          onClick={ handleclickButton }
          data-testid="checkout-btn"
          type="submit"
        >
          Finalizar Compra
        </button>
      </form>

      {!checkedStatus && <span data-testid="error-msg">Campos inválidos</span>}
    </div>
  );
}

export default PagePayments;
