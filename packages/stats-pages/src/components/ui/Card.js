import React from 'react';
import cls from 'classnames';
import styles from './Card.module.scss';

const Card = ({ children, title, icon, className, ...otherProps }) => {
  const Icon = icon;
  return (
    <div className={cls(styles.card, className)} {...otherProps}>
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
