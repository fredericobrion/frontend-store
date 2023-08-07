import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css';
import backArrow from '../images/backArrow.svg';

function Header() {
  return (
    <header className={ styles.header }>
      <Link to="/">
        <img src={ backArrow } alt="Arrow to go back to main page" />
        VOLTAR
      </Link>
      <h1>
        FRONT-END
        <span>
          online store
        </span>
      </h1>
    </header>
  );
}

export default Header;
