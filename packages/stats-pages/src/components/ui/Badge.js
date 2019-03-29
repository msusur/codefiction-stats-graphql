import React from 'react';
import cls from 'classnames';
import styles from './Badge.module.scss';

const Badge = ({ children, size, danger, className }) => {
  const style = {
    width: `${size || 30}px`,
    height: `${size || 30}px`,
  };

  return (
    <div
      className={cls(styles.badge, { [styles.danger]: danger }, className)}
      style={style}
    >
      {children}
    </div>
  );
};

export default Badge;
