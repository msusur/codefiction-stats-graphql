import React from 'react';
import styles from './Navigation.module.scss';
import { Logo } from './Icons';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <Logo className={styles.logo} />
    </nav>
  );
};

export default Navigation;
