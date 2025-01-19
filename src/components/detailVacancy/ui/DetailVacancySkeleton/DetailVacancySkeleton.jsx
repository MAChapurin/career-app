import Skeleton from '../../../Skeleton/Skeleton';
import styles from './DetailVacancySkeleton.module.css';

export const DetailVacancySkeleton = () => {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.subsectionHeader}>
                    <Skeleton className={styles.title}/>
                    <Skeleton className={styles.salary}/>
                </div>
                <div className={styles.subsectionHeader}>
                    <Skeleton className={styles.requirementsTitle}/>
                    <ul className={styles.requirements}>
                        {
                            Array.from({ length: 3 }).map((_,index)=><li key={index} className={styles.requirement}><Skeleton className={styles.requirementIcon}/><Skeleton className={styles.requirementDescription}/></li>)
                        }
                        
                    </ul>
                </div>
            </div>
            <Skeleton className={styles.hideBtn}/>
            <div className={styles.subsection}>
                <Skeleton className={styles.subsectionTitle}/>
                <ul className={styles.descriptions}>
                    {Array.from({ length: 4 }).map((_,index)=><li key={index} className={styles.description}><Skeleton/></li>)}
                </ul>
            </div>

            <div className={styles.subsection}>
                <Skeleton className={styles.subsectionTitle}/>
                <ul className={styles.skills}>
                    {Array.from({ length: 8 }).map((_,index)=><li key={index} className={styles.skill}><Skeleton/></li>)}
                </ul>
            </div>

            <Skeleton className={styles.date}/>
 
        </>
    );
};
