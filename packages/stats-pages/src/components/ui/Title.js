import React from 'react';
import cls from 'classnames';
import styles from './Title.module.scss';

const Title = ({ value, className }) => {
  return <h2 className={cls(styles.title, className)}>{value}</h2>;
};

export default Title;
