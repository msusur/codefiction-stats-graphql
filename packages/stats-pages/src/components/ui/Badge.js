import React from 'react';
import cls from 'classnames';
import styles from './Badge.module.scss';
import { ChevronUp, ChevronDown } from '../Icons';

const Badge = ({ children, value, className }) => {
  const danger = value < 0;
  const equal = value === 0;

  return (
    <div
      className={cls(
        styles.badge,
        { [styles.danger]: danger, [styles.equal]: equal },
        className
      )}
    >
      {danger ? <ChevronDown /> : <ChevronUp />}
      {children}
    </div>
  );
};

export default Badge;
