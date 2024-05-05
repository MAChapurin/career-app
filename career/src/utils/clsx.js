const clsx = (
  ...classNames
) => {
  // Очищаем массив от значений undefined и false
  const classesList = [...classNames].filter((item) => item);

  return classesList.join(' ');
};

export default clsx;