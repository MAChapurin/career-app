export const cn = (
    ...classNames) => {
    const checkNullString = (str) => {
      return !['undefined', 'null'].some((el) => el === str)
    }
    const classList = [...classNames]
      .map((item) => {
        if (!item || typeof item !== 'object') {
          return item
        } else {
          if (!Array.isArray(item)) {
            let row = ''
            Object.entries(item).forEach((el) => {
              if (el[1] && checkNullString(el[0])) row += ` ${el[0]}`
            })
  
            return row.trim()
          } else {
            return item.join(' ').replace(/\s+/, ' ').trim()
          }
        }
      })
      .filter(
        (item) => typeof item === 'string' && item.trim() && checkNullString(item)
      )
  
    return classList.join(' ')
  }