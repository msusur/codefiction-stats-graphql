import React from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import styles from './Navigation.module.scss';
import './ui/Toggle.scss';
import { Logo, Sun, Moon } from './Icons';

const Navigation = ({ changeTheme, theme }) => {
  return (
    <nav className={styles.nav}>
      <Logo className={styles.logo} />
      <Toggle
        className="toggle"
        icons={{
          checked: <Sun />,
          unchecked: <Moon />,
        }}
        checked={theme}
        onChange={changeTheme}
      />
    </nav>
  );
};

export default Navigation;
