import { formatSalary } from './formatSalary';

export const formatVacancy = (data) => {
  const wages = formatSalary(data?.salary?.from, {
    max: data?.salary?.to,
    currency: data?.salary?.currency,
  });

  return {
    name: data.name,
    wages: wages,
    id: data.id,
    company: data.employer.name,
    location: data.address?.city || data.area?.name,
    experience: data.experience.name,
  };
};
