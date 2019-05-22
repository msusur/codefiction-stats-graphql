import React from 'react';
import styles from './Card.module.scss';

const Card = ({ children, title, icon, ...otherProps }) => {
  const Icon = icon;
  return (
    <div className={styles.card} {...otherProps}>
      {title && (
        <div className={styles.cardHeader}>
          <h4 className={styles.cardTitle}>{title}</h4>
          {icon && <Icon />}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
