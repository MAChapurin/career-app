import { useFiltersStore } from '@store/useFiltersStore';

export const useFiltersCounter = (group = '') => {
  const { areas, checkboxes, radios, technologies } = useFiltersStore();

  const only_with_salary = checkboxes.includes('only_with_salary=true') ? 1 : 0;

  const is_period_false = radios.includes('period=period-false') ? -1 : 0;
  const is_salary_false = radios.includes('salary=salary-false') ? -1 : 0;
  const is_experience_false = radios.includes('experience=experience-false')
    ? -1
    : 0;

  const areasLength = areas.length;
  const checkboxesLength = checkboxes.length;
  const educationLength = checkboxes.filter((el) =>
    el.includes('education')
  ).length;
  const employmentLength = checkboxes.filter((el) =>
    el.includes('employment')
  ).length;
  const experienceLength =
    radios.filter((el) => el.includes('experience')).length +
    is_experience_false;
  const part_timeLength = checkboxes.filter((el) =>
    el.includes('part_time')
  ).length;
  const periodLength =
    radios.filter((el) => el.includes('period')).length + is_period_false;
  const radiosLength = radios.length;
  const technologiesLength = technologies.length;
  const scheduleLength = checkboxes.filter((el) =>
    el.includes('schedule')
  ).length;
  const labelLength = checkboxes.filter((el) => el.includes('label')).length;
  const salaryLength =
    radios.filter((el) => el.includes('salary')).length +
    only_with_salary +
    is_salary_false;

  const defaultFoltersCount =
    is_salary_false + is_experience_false + is_period_false;

  const allFilterLength =
    areasLength +
    checkboxesLength +
    radiosLength +
    technologiesLength +
    defaultFoltersCount;
  const restAllLength = allFilterLength - areasLength;
  const restLength = allFilterLength - employmentLength - areasLength;

  const lenghStore = {
    education: educationLength,
    employment: employmentLength,
    experience: experienceLength,
    part_time: part_timeLength,
    period: periodLength,
    rest: restLength,
    restAll: restLength,
    stack: technologiesLength,
    schedule: scheduleLength,
    label: labelLength,
    salary: salaryLength,
  };

  return {
    allFilterLength,
    restAllLength,
    areasLength,
    educationLength,
    employmentLength,
    experienceLength,
    part_timeLength,
    periodLength,
    radiosLength,
    labelLength,
    salaryLength,
    scheduleLength,
    technologiesLength,
    groupLength: lenghStore[group],
  };
};
