import styles from './VacancyCard.module.css'

export const SekeletonCard = () => {
  return (
    <li className={styles.card}>
      <div className={styles.headingAndHover}>
        <div className={styles.loaderHeader}></div>
      </div>
      <p className={styles.loaderPar} />
      <p className={styles.loaderCom} />
      <p className={styles.loaderTxt} />
      <div className={styles.experience}>
        <div className={styles.loaderBall}></div>
        <p className={styles.loaderExp} />
      </div>
    </li>
  )
}

