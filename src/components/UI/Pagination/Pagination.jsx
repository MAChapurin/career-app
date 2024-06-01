import { getPaginationRange } from "@utils/pagination";
import styles from "./Pagination.module.css";

export const Pagination = ({ pages = [], page = 0, handleSetPage }) => {
  if (pages <= 1) {
    return "";
  }

  const list = getPaginationRange(pages, page, 1);

  return (
    <div className={styles.block}>
      {list.map((el, index) => {
        if (el === "...") {
          return (
            <span key={index} className={styles.dotts}>
              {el}
            </span>
          );
        }
        return (
          <button
            key={index}
            disabled={el === page}
            onClick={() => handleSetPage(el)}
            className={`${styles.btn} ${el === page ? styles.selected : ""}`}
          >
            {el}
          </button>
        );
      })}
    </div>
  );
};
