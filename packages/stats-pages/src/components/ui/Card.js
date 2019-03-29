import React from 'react';
import styles from './Card.module.scss';

const Card = ({ children, ...otherProps }) => {
  return (
    <div className={styles.card} {...otherProps}>
      {children}
    </div>
  );
};

export default Card;
