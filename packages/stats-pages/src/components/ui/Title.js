import React from 'react';
import styles from './Title.module.scss';

const Title = ({ value }) => {
  return <h2 className={styles.title}>{value}</h2>;
};

export default Title;
