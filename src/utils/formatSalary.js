const CURRENCIES = {
  RUR: '₽',
  USD: '$',
  EUR: '€',
  KZT: 'KZT',
  BYN: 'Br',
};

const separateNumberByThousands = (num) => {
  if (!num) {
    return '';
  }
  return num.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
};

export const formatSalary = (
  min = null,
  { max = null, currency = 'RUR', type = 'short' }
) => {
  const separatedMin = separateNumberByThousands(min);
  const separatedMax = separateNumberByThousands(max);
  const cur = CURRENCIES[currency] || CURRENCIES.RUR;

  const isLong = type === 'long';
  let postfix = isLong ? ' на руки' : '';

  let formatted = '';
  if ((min || min === 0) && (max || max === 0)) {
    formatted = isLong
      ? `от ${separatedMin} до ${separatedMax} ${cur}${postfix}`
      : `${separatedMin} - ${separatedMax} ${cur}${postfix}`;
  } else if (min || min === 0) {
    formatted = `от ${separatedMin} ${cur}${postfix}`;
  } else if (max || max === 0) {
    formatted = `до ${separatedMax} ${cur}${postfix}`;
  } else {
    formatted = `Не указана`;
  }

  return formatted;
};
