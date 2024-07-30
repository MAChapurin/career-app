import { isEmptyObj } from "../utils/isEmptyObj";
const skipValues = [
  'doesNotMatter',
  'include_hidden_vacancies'
];

export class VacanciesService {

  static createSearchString (params={}) {
    let searchStr = '';


    if(!isEmptyObj(params)) {

      for (const key in params) {
        if (Object.hasOwnProperty.call(params, key)) {
          const element = params[key];

          if(typeof element === 'string') {

            if(skipValues.includes(element)) {
              continue;
            }
            searchStr += `&${key}=${element}`;

          } else {

            if(key !== 'query') {

              element.forEach(el => {
                if(!skipValues.includes(el)) {
                  searchStr += `&${key}=${el}`;
                }
              });

            }

          }
        }
      }

    }


    return searchStr;
  }

  static async get (page=0, limit=18, today=false, params={}) {

    let searchStr = VacanciesService.createSearchString(params);

    let strURL = `https://api.hh.ru/vacancies?per_page=${limit}&page=${page}&order_by=publication_time&${searchStr}`;

    let strText = '&text=frontend+developer';

    if(params.query) {
      strText += '+'+params.query.join('+');
    }

    strURL = strURL + strText;


    if(today) {
      strURL += `&date_from=${new Date(Date.now())
        .toLocaleDateString({
          timeZone: "Europe/Moscow",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-")}`;
    }

    const response = await fetch(strURL);
    if (!response.ok) throw new Error('Что-то пошло не так. Попробуйте позже');
    const result = await response.json();
    return result;
  }

}
