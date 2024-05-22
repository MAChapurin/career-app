function daysApiFilter(data) {
  const dataDateFilter = [];
  const result = data.reduce((res, el) => {
    const dateKey = el.published_at.split('T')[0];
    if (res[dateKey]) {
      res[dateKey].push(el)
    } else {
      res[dateKey] = [el]
    }
    return res;
  }, {})

  for (const key in result) {
    dataDateFilter.push({
      date: key,
      vacancy: result[key]
    })
  }
  return dataDateFilter
}

export default daysApiFilter;