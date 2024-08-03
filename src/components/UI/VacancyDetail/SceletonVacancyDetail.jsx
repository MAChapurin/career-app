import styles from './VacancyDetail.module.css';
import skStyles from './SceletonVacancyDetail.module.css';

export const SceletonVacancyDetail = () => {
  return (
    <div className={styles.content}>
      <div className={styles.leftSide}>
        <div>
          <div className={skStyles.title} />
          <div className={skStyles.wages} />
        </div>
        <div className={styles.requirements}>
          <div className={skStyles.requirements} />
          <div className={styles.requirementsList}>
            {Array(3)
              .fill()
              .map((_, index) => (
                <div key={index} className={styles.requirementsItem}>
                  <div className={skStyles.requirementsIcon} />
                  <div
                    className={`${skStyles.requirementsName} ${
                      !!index ? '' : skStyles.firstRequirementsName
                    }`}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className={skStyles.btn} />
        <div className={styles.descr}>
          <div className={skStyles.titleDescr} />
          <div className={skStyles.descriptionList}>
            {Array(4)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className={`${skStyles.description} ${
                    skStyles['description_' + (index + 1)]
                  }`}
                />
              ))}
          </div>
        </div>
        <div className={styles.skillBlock}>
          <div>
            <div className={skStyles.skillTitle} />
            <div className={styles.skillList}>
              {Array(8)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className={`${skStyles.skillItem} ${
                      skStyles['skillItem_' + (index + 1)]
                    }`}
                  />
                ))}
            </div>
          </div>
          <div className={skStyles.published} />
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={skStyles.logo} />
        <div className={styles.companyDescr}>
          <div className={skStyles.company} />
          <div className={skStyles.address} />
        </div>
      </div>
    </div>
  );
};
