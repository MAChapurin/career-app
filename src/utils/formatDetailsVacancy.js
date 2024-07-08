import { BriefCaseSVG } from "@components/UI/IconsSVG/BriefCaseSVG";
import { StarSVG } from "@components/UI/IconsSVG/StarSVG";
import { TimeSVG } from "@components/UI/IconsSVG/TimeSVG";
import { formatDate } from "./formatDate";

export const formatDetailVacancy = (data) => {
  const formatSalary = (number) => {
    return number ? number.toLocaleString('ru-RU') : '';
  };

  const currencySymbol = data.salary?.currency === 'RUR' ? '₽' : '$';

  const wages = data.salary ? `${data.salary.from ? `от ${formatSalary(data.salary.from)}` : ''} ${data.salary.to && data.salary.from ? '-' : ''
    } ${data.salary.to ? `до ${formatSalary(data.salary.to)}` : ''} ${data.salary.to || data.salary.from ? currencySymbol : ''
    }` : 'Доход не указан';

  return {
    id: data.id,
    name: data.name,
    wages: wages,
    company: data.employer.name,
    location: data.address?.city || data.area?.name,
    requirements: [{ name: data.experience?.name, icon: StarSVG }, { name: data.employment?.name, icon: BriefCaseSVG }, { name: data.schedule?.name, icon: TimeSVG }],
    description: data.description,
    key_skills: data.key_skills,
    area: data.area.name,
    published_at: formatDate(data.published_at, true).formatDate,
    company: data.employer?.name,
    address: data.address?.raw,
    logo: data.employer?.logo_urls?.[240]
  };
};