import { BriefCaseSVG } from '@components/UI/IconsSVG/BriefCaseSVG';
import { StarSVG } from '@components/UI/IconsSVG/StarSVG';
import { TimeSVG } from '@components/UI/IconsSVG/TimeSVG';
import { formatDate } from './formatDate';
import { formatSalary } from './formatSalary';

export const formatDetailVacancy = (data) => {
  const wages = formatSalary(data?.salary?.from, {
    max: data?.salary?.to,
    currency: data?.salary?.currency,
    type: 'long',
  });

  return {
    id: data.id,
    name: data.name,
    wages: wages,
    company: data.employer.name,
    location: data.address?.city || data.area?.name,
    requirements: [
      { name: data.experience?.name, icon: StarSVG },
      { name: data.employment?.name, icon: BriefCaseSVG },
      { name: data.schedule?.name, icon: TimeSVG },
    ],
    description: data.description,
    key_skills: data.key_skills,
    area: data.area.name,
    published_at: formatDate(data.published_at, true).formatDate,
    company: data.employer?.name,
    address: data.address?.raw,
    logo: data.employer?.logo_urls?.[240],
  };
};
