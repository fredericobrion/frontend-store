import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { ProductInfo, InputVerification } from '../types';
import CheckoutItemCard from '../components/CheckoutItemCard';
import Header from '../components/Header';
import styles from '../styles/pagePayment.module.css';
import boleto from '../images/🦆 icon _barcode_.svg';
import visa from '../images/🦆 icon _Visa_.svg';
import masterCard from '../images/🦆 icon _MasterCard_.svg';
import elo from '../images/🦆 icon _elo_.svg';

type PaymentProps = {
  purchasedItens: ProductInfo[],
  setPurchased: (arg: ProductInfo[]) => void,
  setQuantity: (arg: number) => void,
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
  payment: false,
};

function PagePayments({
  purchasedItens,
  setPurchased,
  setQuantity,
}: PaymentProps) {
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
    setIsValid({
      ...isValid,
      payment: true,
    });
    setUserInfo({
      ...userInfo,
      payment: id,
    });
  };

  const handleclickButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const allInputsOk = Object.values(isValid).every((input) => input === true);
    setCheckedStatus(allInputsOk);
    if (allInputsOk) {
      setPurchased([]);
      setQuantity(0);
      navigate('/');
    }
  };

  return (
    <>
      <Header />
      <section className={ styles.productContainer }>
        <h3>Revise seus produtos</h3>
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
      </section>

      <form className={ styles.form }>
        <h5>Informações do comprador</h5>
        <input
          placeholder="Nome Completo"
          value={ userName }
          onChange={ handleChange }
          data-testid="checkout-fullname"
          required
          name="userName"
          type="text"
        />

        <input
          placeholder="CPF"
          value={ cpf }
          required
          name="cpf"
          type="text"
          data-testid="checkout-cpf"
          onChange={ handleChange }
        />

        <input
          placeholder="Email"
          data-testid="checkout-email"
          required
          name="email"
          type="email"
          value={ email }
          onChange={ handleChange }
        />

        <input
          placeholder="Telefone"
          value={ phone }
          required
          name="phone"
          type="text"
          data-testid="checkout-phone"
          onChange={ handleChange }
        />

        <input
          placeholder="CEP"
          value={ cep }
          required
          name="cep"
          type="text"
          data-testid="checkout-cep"
          onChange={ handleChange }
        />

        <input
          placeholder="Endereço"
          value={ address }
          required
          name="address"
          type="text"
          data-testid="checkout-address"
          onChange={ handleChange }
        />

        <h5>Método de pagamento</h5>
        <div className={ styles.paymentMethod }>
          <h6>Boleto</h6>
          <h6>Cartão de Crédito</h6>
          <label htmlFor="ticket">
            <input
              checked={ userInfo.payment === 'ticket' }
              onChange={ handleClickRadio }
              data-testid="ticket-payment"
              id="ticket"
              name="payment-method"
              type="radio"
            />
            <img src={ boleto } alt="" />
          </label>

          <label htmlFor="visa-card">
            <input
              checked={ userInfo.payment === 'visa-card' }
              onChange={ handleClickRadio }
              id="visa-card"
              name="payment-method"
              type="radio"
              data-testid="visa-payment"
            />
            <img src={ visa } alt="Visa Card" />
          </label>

          <label htmlFor="masterCard-card">
            <input
              checked={ userInfo.payment === 'masterCard-card' }
              onChange={ handleClickRadio }
              data-testid="master-payment"
              id="masterCard-card"
              name="payment-method"
              type="radio"
            />
            <img src={ masterCard } alt="Mastercard Card" />
          </label>

          <label htmlFor="eloCard">
            <input
              checked={ userInfo.payment === 'eloCard' }
              onChange={ handleClickRadio }
              data-testid="elo-payment"
              id="eloCard"
              name="payment-method"
              type="radio"
            />
            <img src={ elo } alt="Elo Card" />
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
    </>
  );
}

export default PagePayments;
