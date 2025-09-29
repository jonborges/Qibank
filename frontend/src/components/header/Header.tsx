import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from "../../assets/images/logo.png";
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`${styles.navbar} ${isMenuOpen ? styles.navOpen : ''}`}>
      <Link to="/"><img src={logo} alt="QiBank Logo" className={styles.logo} /></Link>
      
      <button className={styles.menuToggle} onClick={toggleMenu} aria-label="Abrir menu">
        <div className={styles.hamburger}></div>
      </button>

      <div className={`${styles.links} ${isMenuOpen ? styles.linksOpen : ''}`}>
        {isLoggedIn ? (
          <Link to="/account">Sua Conta</Link>
        ) : (
          <Link to="/login">Entre</Link>
        )}
        <Link to="/compare-banks">Compare aqui!</Link>
        <Link to="/invest">Manual do Investimento</Link>
        {isLoggedIn && (
          <button onClick={handleLogout} className={styles.logoutButton}>Sair</button>
        )}
      </div>
    </nav>
  );
}
