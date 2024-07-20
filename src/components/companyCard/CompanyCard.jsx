import styles from "./CompanyCard.module.css";

const CompanyCard = ({ logoSrc, name, address }) => {
  return (
    <div className={styles.card}>
      {logoSrc && <img className={styles.logo} src={logoSrc} alt={name} />}
      <div className={styles.info}>
        {name && <h4 className={styles.name}>{name}</h4>}
        {address && (
          <address className={styles.address}>{`г. ${address}`}</address>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;
