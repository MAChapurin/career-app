import { useEffect, useState } from 'react'
import styles from './Pagination.module.css'
import { cn } from '../../utils'


/**
 *Компонент пагинации, можно переиспользовать, параметр в коллбэке берется из стэйта компонента
 * @param {number} pages - количество страниц для пагинации
 * @param {function} fetchCallback - функция запроса данных,
 * первым параметром должна принимать страницу,
 * берется из стэйта компонента, стартовое значение 1
 * @returns комонет пагинации
 * @example  <Pagination pages={pages} fetchCallback={fetchVacancyList}/>
 */
export function Pagination({ pages, fetchCallback }) {
  const [page, setPage] = useState(1)
  const [isTouched, setIsTouched] = useState(false)

  const handlerClick = (e) => {
    console.log('click test')
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
          <button className={cn(styles.btn, {
            [styles.active]: page == 1
          })} data-page={1}>{1}</button>
        </li>
        <li className={cn(styles.item, styles.hidden, {
          [styles.show]: page > 3

        })}>
          <p>...</p>
        </li>
        {Array.from({ length: pages - 2 }).map((_, index) => (
          <li
            className={cn(styles.item, styles.hidden, {
              [styles.show]: (index > pages - 6 && page > pages - 3)
                || (index < 3 && page < 4)
                || (page >= index + 1 && page <= index + 3)

            })}
            key={index}>
            <button
              className={cn(styles.btn, {
                [styles.active]: page == index + 2,
              })}
              data-page={index + 2}>
              {index + 2}
            </button>
          </li>
        ))}
        <li className={cn(styles.item, styles.hidden, {
          [styles.show]: page <= pages - 3

        })}>
          <p>...</p>
        </li>
        <li className={styles.item}>
          <button
            className={cn(styles.btn, {
              [styles.active]: page == pages
            })}
            data-page={pages}>
            {pages}
          </button>
        </li>
      </ul>
    </div>
  )
}
