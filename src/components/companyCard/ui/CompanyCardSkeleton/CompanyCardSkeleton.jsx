import Skeleton from "../../../Skeleton/Skeleton";
import styles from './CompanyCardSkeleton.module.css';

export const CompanyCardSkeleton = () => {
    return (
        <>
            <Skeleton className={styles.img}/>
            <div className={styles.info}>
                <Skeleton className={styles.name}/>
                <Skeleton className={styles.address}/>
            </div>
        </>
    );
};
