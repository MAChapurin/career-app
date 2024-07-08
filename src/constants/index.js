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
  vacancy: '/vacancy'
}

export const filterItems = [
  {
    type: 'input',
    name: 'Город',
    icon: LocationSVG,
  },
  {
    type: 'dropdown',
    name: 'Тип занятости',
    icon: BriefCaseSVG,
    items: [
      {
        type: 'checkbox',
        name: 'employment-type',
        value: 'full-time',
        text: 'Полная занятость',
      },
      {
        type: 'checkbox',
        name: 'employment-type',
        value: 'part-time',
        text: 'Частичная занятость',
      },
      {
        type: 'checkbox',
        name: 'employment-type',
        value: 'internship',
        text: 'Стажировка',
      },
      {
        type: 'checkbox',
        name: 'employment-type',
        value: 'project-work',
        text: 'Проектная работа',
      },
    ],
  },
  {
    type: 'dropdown',
    name: 'Дополнительные фильтры',
    icon: FilterSVG,
    items: [
      {
        type: 'dropdown',
        name: 'Дата публикации вакансии',
        icon: CalendarSVG,
        items: [
          {
            type: 'radio',
            name: 'publication-date',
            value: 'all-time',
            text: 'За все время',
          },
          {
            type: 'radio',
            name: 'publication-date',
            value: 'month',
            text: 'За месяц',
          },
          {
            type: 'radio',
            name: 'publication-date',
            value: 'week',
            text: 'За неделю',
          },
          {
            type: 'radio',
            name: 'publication-date',
            value: '3-days',
            text: 'За последние 3 дня',
          },
          {
            type: 'radio',
            name: 'publication-date',
            value: 'day',
            text: 'За сутки',
          },
        ],
      },
      {
        type: 'dropdown',
        name: 'Опыт работы',
        icon: StarSVG,
        items: [
          {
            type: 'radio',
            name: 'experience',
            value: 'doesnt-matter',
            text: 'Не имеет значения',
          },
          {
            type: 'radio',
            name: 'experience',
            value: '0',
            text: 'Нет опыта',
          },
          {
            type: 'radio',
            name: 'experience',
            value: '1-3',
            text: 'От 1 года до 3 лет',
          },
          {
            type: 'radio',
            name: 'experience',
            value: '3-6',
            text: 'От 3 до 6 лет',
          },
          {
            type: 'radio',
            name: 'experience',
            value: '>6',
            text: 'Более 6 лет',
          },
        ],
      },
      {
        type: 'dropdown',
        name: 'График работы',
        icon: TimeSVG,
        items: [
          {
            type: 'checkbox',
            name: 'work-schedule',
            value: 'full-day',
            text: 'Полный день',
          },
          {
            type: 'checkbox',
            name: 'work-schedule',
            value: 'rotating-scheme',
            text: 'Вахтовый метод',
          },
          {
            type: 'checkbox',
            name: 'work-schedule',
            value: 'shift-schedule',
            text: 'Сменный график',
          },
          {
            type: 'checkbox',
            name: 'work-schedule',
            value: 'flexible-schedule',
            text: 'Гибкий график',
          },
          {
            type: 'checkbox',
            name: 'work-schedule',
            value: 'remote-work',
            text: 'Удаленная работа',
          },
        ],
      },
      {
        type: 'dropdown',
        name: 'Теги технологий',
        icon: StackSVG,
        items: [
          {
            type: 'checkbox',
            name: 'stack',
            value: 'jquery',
            text: 'JQuery',
          },
          {
            type: 'checkbox',
            name: 'stack',
            value: 'js',
            text: 'JavaScript',
          },
          {
            type: 'checkbox',
            name: 'stack',
            value: 'css3',
            text: 'CSS3',
          },
          {
            type: 'checkbox',
            name: 'stack',
            value: 'react',
            text: 'React',
          },
          {
            type: 'checkbox',
            name: 'stack',
            value: 'git',
            text: 'Git',
          },
          {
            type: 'checkbox',
            name: 'stack',
            value: 'vue',
            text: 'Vue',
          },
          {
            type: 'checkbox',
            name: 'stack',
            value: 'flexbox',
            text: 'Flexbox',
          },
          {
            type: 'checkbox',
            name: 'stack',
            value: 'html5',
            text: 'HTML5',
          },
        ],
      },
      {
        type: 'dropdown',
        name: 'Образование',
        icon: GraduationSVG,
        items: [
          {
            type: 'checkbox',
            name: 'education',
            value: 'no',
            text: 'Не требуется или не указано',
          },
          {
            type: 'checkbox',
            name: 'education',
            value: 'secondary-vocational',
            text: 'Среднее профессиональное',
          },
          {
            type: 'checkbox',
            name: 'education',
            value: 'higher',
            text: 'Высшее',
          },
        ],
      },
      {
        type: 'dropdown',
        name: 'Уровень дохода',
        icon: SalarySVG,
        items: [
          {
            type: 'radio',
            name: 'salary',
            value: 'doesnt-matter',
            text: 'Не имеет значения',
          },
          {
            type: 'radio',
            name: 'salary',
            value: '>25k',
            text: 'от 25 000 ₽',
          },
          {
            type: 'radio',
            name: 'salary',
            value: '>50k',
            text: 'от 50 000 ₽',
          },
          {
            type: 'radio',
            name: 'salary',
            value: '>100k',
            text: 'от 100 000 ₽',
          },
          {
            type: 'radio',
            name: 'salary',
            value: '>150k',
            text: 'от 150 000 ₽',
          },
          {
            type: 'checkbox',
            name: 'salary',
            value: 'specified',
            text: 'Указан доход',
          },
        ],
      },
      {
        type: 'dropdown',
        name: 'Подработка',
        icon: TomeJobSVG,
        items: [
          {
            type: 'checkbox',
            name: 'side-job',
            value: 'part-time',
            text: 'Неполный день',
          },
          {
            type: 'checkbox',
            name: 'side-job',
            value: '>4hours',
            text: 'От 4 часов в день',
          },
          {
            type: 'checkbox',
            name: 'side-job',
            value: 'evenings',
            text: 'По вечерам',
          },
          {
            type: 'checkbox',
            name: 'side-job',
            value: 'weekends',
            text: 'По выходным',
          },
          {
            type: 'checkbox',
            name: 'side-job',
            value: 'single-task',
            text: 'Разовое задание',
          },
        ],
      },
      {
        type: 'dropdown',
        name: 'Другие параметры',
        icon: MoreFiltersSVG,
        items: [
          {
            type: 'checkbox',
            name: 'other-parameters',
            value: 'with-disabilities',
            text: 'Доступные людям с инвалидностью',
          },
          {
            type: 'checkbox',
            name: 'other-parameters',
            value: 'hidden',
            text: 'Скрытые вакансии',
          },
          {
            type: 'checkbox',
            name: 'other-parameters',
            value: '>4hours',
            text: 'От 4х часов в день',
          },
          {
            type: 'checkbox',
            name: 'other-parameters',
            value: 'accredited-companies',
            text: 'От аккредитованных ИТ компаний',
          },
          {
            type: 'checkbox',
            name: 'other-parameters',
            value: 'except-recruitment-agencies',
            text: 'Без вакансий от кадровых агенств',
          },
        ],
      },
    ],
  },
];
