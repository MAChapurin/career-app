import { cn } from "../../../utils";
import Skeleton from "../Skeleton";
import styles from "./skeletonBlock.module.css";

const SkeletonBlock = ({ count = 18, hasTitle = true }) => {

  return (
    <div className={cn(styles.wrapper, {
      [styles.wrapperNoPadding]: !hasTitle
    })}>
      {hasTitle && <Skeleton className={styles.title} />}
      <ul className={styles.skeletonList}>
        {Array.from({ length: count }, (_, index) => (
          <li className={styles.skeletonItem} key={index}>
            <Skeleton className={styles.vacancyName} />
            <Skeleton className={styles.salary} />
            <Skeleton className={styles.companyName} />
            <Skeleton className={styles.city} />
            <div className={styles.skeletonBottom}>
              <Skeleton className={styles.expIcon} />
              <Skeleton className={styles.expValue} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkeletonBlock;
