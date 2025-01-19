
import styles from "./CompanyCard.module.css";
import { CompanyCardSkeleton } from "./ui/CompanyCardSkeleton/CompanyCardSkeleton";

const CompanyCard = ({isLoading, logoSrc, name, address }) => {
  return (
    <div className={styles.card}>

      {
        isLoading
        ? <CompanyCardSkeleton/>
        :
        <>
          {logoSrc && <img className={styles.logo} src={logoSrc} alt={name} />}
          <div className={styles.info}>
            {name && <h4 className={styles.name}>{name}</h4>}
            {address && (
              <address className={styles.address}>{`г. ${address}`}</address>
            )}
          </div>
        </>
         }
    </div>
  );
};

export default CompanyCard;
