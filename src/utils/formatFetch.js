export const formatVacancy = (data) => {
  const formatSalary = (number) => {
    return number ? number.toLocaleString('ru-RU') : '';
  };

  const currencySymbol = data.salary.currency === 'RUR' ? '₽' : '$';

  const wages = `${data.salary.from ? formatSalary(data.salary.from) : ''} ${
    data.salary.to && data.salary.from ? '-' : ''
  } ${data.salary.to ? formatSalary(data.salary.to) : ''} ${
    data.salary.to || data.salary.from ? currencySymbol : ''
  }`;

  return {
    name: data.name,
    wages: wages,

    company: data.employer.name,
    location: data.address?.city || data.area?.name,
    experience: data.experience.name,
  };
};
