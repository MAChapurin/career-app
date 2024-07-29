import styles from './styles.module.css';

export const IconCheck = ({className=''}) => {
  return (
    <svg className={`${styles.block} ${className}`} viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  d="M5.66 1L2 5L0.33 3.18" strokeOpacity="1" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
};
