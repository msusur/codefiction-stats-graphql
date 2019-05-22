import React from 'react';
import cls from 'classnames';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import styles from './Navigation.module.scss';
import './ui/Toggle.scss';
import { Logo, Sun, Moon } from './Icons';

const Navigation = ({ changeTheme, theme }) => {
  return (
    <nav className={styles.nav}>
      <div className={cls('container', styles.content)}>
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
      </div>
    </nav>
  );
};

export default Navigation;
