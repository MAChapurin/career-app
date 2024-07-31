import { useRef } from 'react';
import { XMarkSolidSVG } from '../IconsSVG/XMarkSolidSVG';
import clsx from '@utils/clsx';
import styles from './Input.module.css';

export const Input = ({
  type = 'text',
  name,
  icon: Icon,
  value,
  onChange,
  count,
  ...props
}) => {
  const ref = useRef(null);
  const isClearBtnShown = type === 'search' && !!value;

  const onClear = () => {
    onChange({ target: { value: '' } });
  };

  return (
    <div
      className={clsx(
        styles.inputWrapper,
        isClearBtnShown && styles.clearBtnShown
      )}
    >
      <Icon className={styles.icon} />
      <input
        ref={ref}
        type={type}
        className={styles.input}
        name={name}
        placeholder={name}
        value={value}
        onChange={onChange}
        count={count}
        {...props}
      />
      {count > 0 && (
        <span
          className={clsx(
            styles.count,
            value.length === 0 && styles.countRight
          )}
        >
          {count}
        </span>
      )}
      {isClearBtnShown && (
        <button className={clsx('btn', styles.clearBtn)} onClick={onClear}>
          <XMarkSolidSVG />
        </button>
      )}
    </div>
  );
};
