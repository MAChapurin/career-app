import { useEffect, useState } from 'react'
import styles from './Pagination.module.css'
import { cn } from '../../utils'


/**
 *Компонент пагинации, можно переиспользовать, параметр в коллбэке берется из стэйта компонента
 * @param {number} page - текущая траница(стартовое значение 0 или 1, в зависимости от вашего API)
 * @param {function} setPage - функция изменения page, аргументов принимает page
 * @param {number} pages - количество страниц для пагинации
 * @param {function} fetchCallback - функция запроса данных,
 * @param {boolean} disabled - состояние кнопок disabled, передаем состояние загрузки
 * первым параметром должна принимать страницу,
 * берется из стэйта компонента, стартовое значение 1
 * @returns комонет пагинации
 * @example   <Pagination page={page} setPage={setPage} pages={pages} fetchCallback={fetchVacancyList}/>}
 */
export function Pagination({ page, setPage, pages, fetchCallback, disabled }) {

  const [isTouched, setIsTouched] = useState(false)

  const handlerClick = (e) => {
    setIsTouched(true)
    const pageNumber = e.target.dataset?.page
    if (e.target instanceof HTMLButtonElement && pageNumber) {
      setPage(pageNumber > pages ? pages : pageNumber)
    }
  }

  useEffect(() => {
    isTouched && fetchCallback(page)
  }, [page])

  return (
    <div className={styles.pagination}>
      <ul className={styles.list} onClick={handlerClick}>
        <li className={styles.item}>
          <button
            className={cn(styles.btn, {
              [styles.active]: page == 0
            })}
            data-page={0}
            disabled={disabled}
          >
            {1}
          </button>
        </li>
        <li className={cn(styles.item, styles.hidden, {
          [styles.show]: page > 3 && pages > 5
        })}>
          <p>...</p>
        </li>
        {Array.from({ length: pages - 2 }).map((_, index) => (
          <li
            className={cn(styles.item, styles.hidden, {
              [styles.show]: (index > pages - 6 && page >= pages - 4)
                || (index < 3 && page < 4)
                || (page >= index && page <= index + 2)

            })}
            key={index}>
            <button
              className={cn(styles.btn, {
                [styles.active]: page == index + 1,
              })}
              data-page={index + 1}
              disabled={disabled}
            >
              {index + 2}
            </button>
          </li>
        ))}
        <li className={cn(styles.item, styles.hidden, {
          [styles.show]: page < pages - 4 && pages > 5

        })}>
          <p>...</p>
        </li>
        <li className={styles.item}>
          <button
            className={cn(styles.btn, {
              [styles.active]: page == pages - 1
            })}
            data-page={pages - 1}
            disabled={disabled}>
            {pages}
          </button>
        </li>
      </ul>
    </div>
  )
}
