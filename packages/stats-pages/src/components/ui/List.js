import React from 'react';
import cls from 'classnames';
import styles from './List.module.scss';

export const List = ({ children, className, unstyled, ...otherProps }) => {
  return (
    <ul
      className={cls(styles.list, className, { [styles.unstyled]: unstyled })}
      {...otherProps}
    >
      {children}
    </ul>
  );
};

export const ListItem = ({ children, className, ...otherProps }) => {
  return (
    <li className={cls(styles.listItem, className)} {...otherProps}>
      {children}
    </li>
  );
};
