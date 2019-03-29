import React from 'react';
import cls from 'classnames';
import styles from './Icons.module.scss';

const SvgIcon = React.forwardRef(function SvgIcon(props, ref) {
  const { children, className, viewBox } = props;

  return (
    <svg
      className={cls(styles.root, className)}
      viewBox={viewBox || '0 0 24 24'}
      ref={ref}
    >
      {children}
    </svg>
  );
});

export const Logo = ({ ...otherProps }) => (
  <SvgIcon viewBox="0 0 512 512" {...otherProps}>
    <path
      d="M476.545,128.282L371.76,190.518l-114.229-67.876l-114.906,65.43v133.923l110.716,64.786h6.769
	l111.683-63.819l106.848,60.434L258.176,512L33.36,384.846V119.418L258.176,0L476.545,128.282z"
    />
  </SvgIcon>
);
export default SvgIcon;
