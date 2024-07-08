export const formatVacancy = (data) => {
  const formatSalary = (number) => {
    return number ? number.toLocaleString('ru-RU') : '';
  };

  const currencySymbol = data.salary?.currency === 'RUR' ? '₽' : '$';

  const wages = data.salary ? `${data.salary.from ? `от ${formatSalary(data.salary.from)}` : ''} ${data.salary.to && data.salary.from ? '-' : ''
    } ${data.salary.to ? `до ${formatSalary(data.salary.to)}` : ''} ${data.salary.to || data.salary.from ? currencySymbol : ''
    }` : 'Доход не указан';


  return {
    name: data.name,
    wages: wages,
    id: data.id,
    company: data.employer.name,
    location: data.address?.city || data.area?.name,
    experience: data.experience.name,
  };
};
