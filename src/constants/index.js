import { BriefCaseSVG } from '@components/UI/IconsSVG/BriefCaseSVG';
import { CalendarSVG } from '@components/UI/IconsSVG/CalendarSVG';
import { FilterSVG } from '@components/UI/IconsSVG/FilterSVG';
import { GraduationSVG } from '@components/UI/IconsSVG/GraduationSVG';
import { LocationSVG } from '@components/UI/IconsSVG/LocationSVG';
import { MoreFiltersSVG } from '@components/UI/IconsSVG/MoreFiltersSVG';
import { SalarySVG } from '@components/UI/IconsSVG/SalarySVG';
import { StackSVG } from '@components/UI/IconsSVG/StackSVG';
import { StarSVG } from '@components/UI/IconsSVG/StarSVG';
import { TimeSVG } from '@components/UI/IconsSVG/TimeSVG';
import { TomeJobSVG } from '@components/UI/IconsSVG/TomeJobSVG';

export const APP_PAGE = {
  main: '/',
  vacancy: '/vacancy',
};

export const SCREEN_TYPES = {
  DESKTOP: 3,
  TABLET: 2,
  MOBILE: 1,
};

export const LIMIT_CARD_FOR_MAIN_PAGE = 18;
export const LIMIT_CAR_FOR_SIMILARY = 6;

export const filterInputItems = [
  {
    type: 'input',
    name: 'Город',
    icon: LocationSVG,
  },
];

export const filterItems = [
  {
    type: 'dropdown',
    name: 'Тип занятости',
    icon: BriefCaseSVG,
    group: 'employment',
    items: [
      {
        type: 'checkbox',
        name: 'employment',
        value: 'full',
        text: 'Полная занятость',
        id: 'full',
      },
      {
        type: 'checkbox',
        name: 'employment',
        value: 'part',
        text: 'Частичная занятость',
        id: 'part',
      },
      {
        type: 'checkbox',
        name: 'employment',
        value: 'probation',
        text: 'Стажировка',
        id: 'probation',
      },
      {
        type: 'checkbox',
        name: 'employment',
        value: 'project',
        text: 'Проектная работа',
        id: 'project',
      },
      {
        type: 'checkbox',
        name: 'employment',
        value: 'volunteer',
        text: 'Волонтерство',
        id: 'volunteer',
      },
    ],
  },
  {
    type: 'dropdown',
    name: 'Дополнительные фильтры',
    icon: FilterSVG,
    group: 'rest',
    items: [
      {
        type: 'dropdown',
        name: 'Дата публикации вакансии',
        icon: CalendarSVG,
        group: 'period',
        items: [
          {
            type: 'radio',
            name: 'period',
            value: '60',
            text: 'За все время',
            id: 'period-false',
          },
          {
            type: 'radio',
            name: 'period',
            value: '30',
            text: 'За месяц',
            id: '30',
          },
          {
            type: 'radio',
            name: 'period',
            value: '7',
            text: 'За неделю',
            id: '7',
          },
          {
            type: 'radio',
            name: 'period',
            value: '3',
            text: 'За последние 3 дня',
            id: '3',
          },
          {
            type: 'radio',
            name: 'period',
            value: '1',
            text: 'За сутки',
            id: '1',
          },
        ],
      },
      {
        type: 'dropdown',
        name: 'Опыт работы',
        icon: StarSVG,
        group: 'experience',
        items: [
          {
            type: 'radio',
            name: 'experience',
            value: 'doesnt-matter',
            text: 'Не имеет значения',
            id: 'experience-false',
          },
          {
            type: 'radio',
            name: 'experience',
            value: '0',
            text: 'Нет опыта',
            id: 'noExperience',
          },
          {
            type: 'radio',
            name: 'experience',
            value: 'between1And3',
            text: 'От 1 года до 3 лет',
            id: 'between1And3',
          },
          {
            type: 'radio',
            name: 'experience',
            value: 'between3And6',
            text: 'От 3 до 6 лет',
            id: 'between3And6',
          },
          {
            type: 'radio',
            name: 'experience',
            value: 'moreThan6',
            text: 'Более 6 лет',
            id: 'moreThan6',
          },
        ],
      },
      {
        type: 'dropdown',
        name: 'График работы',
        icon: TimeSVG,
        group: 'schedule',
        items: [
          {
            type: 'checkbox',
            name: 'schedule',
            value: 'fullDay',
            text: 'Полный день',
            id: 'fullDay',
          },
          {
            type: 'checkbox',
            name: 'schedule',
            value: 'flyInFlyOut',
            text: 'Вахтовый метод',
            id: 'flyInFlyOut',
          },
          {
            type: 'checkbox',
            name: 'schedule',
            value: 'shift',
            text: 'Сменный график',
            id: 'shift',
          },
          {
            type: 'checkbox',
            name: 'schedule',
            value: 'flexible',
            text: 'Гибкий график',
            id: 'flexible',
          },
          {
            type: 'checkbox',
            name: 'schedule',
            value: 'remote',
            text: 'Удаленная работа',
            id: 'remote',
          },
        ],
      },
      {
        type: 'dropdown',
        name: 'Теги технологий',
        icon: StackSVG,
        group: 'stack',
        items: [
          {
            type: 'checkbox',
            name: 'stack',
            value: 'jquery',
            text: 'JQuery',
            id: 'JQuery',
          },
          {
            type: 'checkbox',
            name: 'stack',
            value: 'js',
            text: 'JavaScript',
            id: 'JavaScript',
          },
          {
            type: 'checkbox',
            name: 'stack',
            value: 'css3',
            text: 'CSS3',
            id: 'CSS3',
          },
          {
            type: 'checkbox',
            name: 'stack',
            value: 'react',
            text: 'React',
            id: 'react',
          },
          {
            type: 'checkbox',
            name: 'stack',
            value: 'git',
            text: 'Git',
            id: 'git',
          },
          {
            type: 'checkbox',
            name: 'stack',
            value: 'vue',
            text: 'Vue',
            id: 'vue',
          },
          {
            type: 'checkbox',
            name: 'stack',
            value: 'flexbox',
            text: 'Flexbox',
            id: 'flexbox',
          },
          {
            type: 'checkbox',
            name: 'stack',
            value: 'html5',
            text: 'HTML5',
            id: 'HTML5',
          },
        ],
      },
      {
        type: 'dropdown',
        name: 'Образование',
        icon: GraduationSVG,
        group: 'education',
        items: [
          {
            type: 'checkbox',
            name: 'education',
            value: 'not_required_or_not_specified',
            text: 'Не требуется или не указано',
            id: 'not_required_or_not_specified',
          },
          {
            type: 'checkbox',
            name: 'education',
            value: 'special_secondary',
            text: 'Среднее профессиональное',
            id: 'special_secondary',
          },
          {
            type: 'checkbox',
            name: 'education',
            value: 'higher',
            text: 'Высшее',
            id: 'higher',
          },
        ],
      },
      {
        type: 'dropdown',
        name: 'Уровень дохода',
        icon: SalarySVG,
        group: 'salary',
        items: [
          {
            type: 'radio',
            name: 'salary',
            value: '0',
            text: 'Не имеет значения',
            id: 'salary-false',
          },
          {
            type: 'radio',
            name: 'salary',
            value: '25000',
            text: 'от 25 000 ₽',
            id: '25000',
          },
          {
            type: 'radio',
            name: 'salary',
            value: '50000',
            text: 'от 50 000 ₽',
            id: '50000',
          },
          {
            type: 'radio',
            name: 'salary',
            value: '100000',
            text: 'от 100 000 ₽',
            id: '100000',
          },
          {
            type: 'radio',
            name: 'salary',
            value: '150000',
            text: 'от 150 000 ₽',
            id: '150000',
          },
          {
            type: 'checkbox',
            name: 'only_with_salary',
            value: 'specified',
            text: 'Указан доход',
            id: 'true',
          },
        ],
      },
      {
        type: 'dropdown',
        name: 'Подработка',
        icon: TomeJobSVG,
        group: 'part_time',
        items: [
          {
            type: 'checkbox',
            name: 'part_time',
            value: 'employment_part',
            text: 'Неполный день',
            id: 'employment_part',
          },
          {
            type: 'checkbox',
            name: 'part_time',
            value: 'from_four_to_six_hours_in_a_day',
            text: 'От 4 часов в день',
            id: 'from_four_to_six_hours_in_a_day',
          },
          {
            type: 'checkbox',
            name: 'part_time',
            value: 'start_after_sixteen',
            text: 'По вечерам',
            id: 'start_after_sixteen',
          },
          {
            type: 'checkbox',
            name: 'part_time',
            value: 'only_saturday_and_sunday',
            text: 'По выходным',
            id: 'only_saturday_and_sunday',
          },
          {
            type: 'checkbox',
            name: 'part_time',
            value: 'employment_project',
            text: 'Разовое задание',
            id: 'employment_project',
          },
        ],
      },
      {
        type: 'dropdown',
        name: 'Другие параметры',
        icon: MoreFiltersSVG,
        group: 'label',
        items: [
          {
            type: 'checkbox',
            name: 'label',
            value: 'accept_handicapped',
            text: 'Доступные людям с инвалидностью',
            id: 'accept_handicapped',
          },
          {
            type: 'checkbox',
            name: 'label',
            value: 'hidden',
            text: 'Скрытые вакансии',
            id: 'hidden',
          },
          // {
          //   type: 'checkbox',
          //   name: 'from_four_to_six_hours_in_a_day',
          //   value: 'from_four_to_six_hours_in_a_day',
          //   text: 'От 4х часов в день',
          //   id: 'from_four_to_six_hours_in_a_day'
          // },// - этот был два раза, вероятно косяк дизайнера
          {
            type: 'checkbox',
            name: 'label',
            value: 'accredited_it',
            text: 'От аккредитованных ИТ компаний',
            id: 'accredited_it',
          },
          {
            type: 'checkbox',
            name: 'label',
            value: 'not_from_agency',
            text: 'Без вакансий от кадровых агенств',
            id: 'not_from_agency',
          },
        ],
      },
    ],
  },
];
