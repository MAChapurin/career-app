import { IconsFilter } from "../icons-filter";

export const filterList = [
  {
    id: 1,
    title: '',
    icon: '',
    multiple: true,
    name: 'employment',
    items: [
      {
        name: 'Полная занятость',
        value: 'full'
      },
      {
        name: 'Частичная занятость',
        value: 'part'
      },
      {
        name: 'Стажировка',
        value: 'probation'
      },
      {
        name: 'Проектная работа',
        value: 'project'
      }
    ]
  },
];

export const sectionList = [
  {
    id: 3,
    title: 'Дата публикации вакансии',
    icon: <IconsFilter icon={'calendar'} />,
    multiple: false,
    name: 'search_period',
    items: [
      {
        name: 'За все время',
        value: '0'
      },
      {
        name: 'За месяц',
        value: '30'
      },
      {
        name: 'За неделю',
        value: '7'
      },
      {
        name: 'За последние 3 дня',
        value: '3'
      },
      {
        name: 'За сутки',
        value: '1'
      }
    ]
  },
  {
    id: 4,
    title: 'Опыт работы',
    icon: <IconsFilter icon={'star'} />,
    multiple: false,
    name: 'experience',
    items: [
      {
        name: 'Не имеет значения',
        value: 'doesNotMatter'
      },
      {
        name: 'Нет опыта',
        value: 'noExperience'
      },
      {
        name: 'От 1 года до 3 лет',
        value: 'between1And3'
      },
      {
        name: 'От 3 до 6 лет',
        value: 'between3And6'
      },
      {
        name: 'Более 6 лет',
        value: 'moreThan6'
      }
    ]
  },
  {
    id: 5,
    title: 'График работы',
    icon: <IconsFilter icon={'clock'} />,
    multiple: true,
    name: 'schedule',
    items: [
      {
        name: 'Полный день',
        value: 'fullDay'
      },
      {
        name: 'Вахтовый метод',
        value: 'flyInFlyOut'
      },
      {
        name: 'Сменный график',
        value: 'shift'
      },
      {
        name: 'Гибкий график',
        value: 'flexible'
      },
      {
        name: 'Удалённая работа',
        value: 'remote'
      }
    ]
  },

  {
    id: 6,
    title: 'Теги технологий',
    icon: <IconsFilter icon={'stack'} />,
    multiple: true,
    name: 'query',
    items: [
      {
        name: 'JQuery',
        value: 1
      },
      {
        name: 'JavaScript',
        value: 2
      },
      {
        name: 'CSS3',
        value: 3
      },
      {
        name: 'React',
        value: 4
      },
      {
        name: 'Git',
        value: 4
      },
      {
        name: 'Vue',
        value: 4
      },
      {
        name: 'Flexbox',
        value: 4
      },
      {
        name: 'HTML5',
        value: 4
      }
    ]
  },

  {
    id: 7,
    title: 'Образование',
    icon: <IconsFilter icon={'education'} />,
    multiple: true,
    name: 'education',
    items: [
      {
        name: 'Не требуется или не указано',
        value: 'not_required_or_not_specified'
      },
      {
        name: 'Среднее профессиональное',
        value: 'special_secondary'
      },
      {
        name: 'Высшее',
        value: 'higher'
      }
    ]
  },

  {
    id: 8,
    title: 'Уровень дохода',
    icon: <IconsFilter icon={'coins'} />,
    multiple: false,
    name: 'salary',
    items: [
      {
        name: 'Не имеет значения',
        value: 'doesNotMatter'
      },
      {
        name: 'от 25 000 ₽',
        value: '25000'
      },
      {
        name: 'от 50 000 ₽',
        value: '50000'
      },
      {
        name: 'от 100 000 ₽',
        value: '100000'
      },
      {
        name: 'от 150 000 ₽',
        value: '150000'
      }
    ],
    otherItems: [
      {
        id: 88,
        title: '',
        multiple: true,
        name: 'only_with_salary',
        items: [
          {
            name: 'Указан доход',
            value: 'true'
          },
        ]
      }
    ]
  },

  {
    id: 9,
    title: 'Подработка',
    icon: <IconsFilter icon={'bagClock'} />,
    multiple: true,
    name: 'part_time',
    items: [
      {
        name: 'Неполный день',
        value: 'employment_part'
      },
      {
        name: 'от 4 часов в день',
        value: 'from_four_to_six_hours_in_a_day'
      },
      {
        name: 'По вечерам',
        value: 'start_after_sixteen'
      },
      {
        name: 'По выходным',
        value: 'only_saturday_and_sunday'
      },
      {
        name: 'Разовое задание',
        value: 'employment_project'
      }
    ]
  },
  {
    id: 10,
    title: 'Другие параметры',
    icon: <IconsFilter icon={'other'} />,
    multiple: true,
    name: 'label',
    items: [
      {
        name: 'Доступные людям с инфалидностью',
        value: 'accept_handicapped'
      },
      {
        name: 'От аккредитованных ИТ-компаний',
        value: 'accredited_it'
      },
      {
        name: 'Без вакансий от кадровых агенств',
        value: 'not_from_agency'
      }
    ]
  },
];
