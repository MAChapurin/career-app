export const searchCityByName = (countryAreas=[], str='') => {
  let result = [];
  countryAreas.forEach(region=>{

    if(region.areas.length) {
      const founded = region.areas.filter(({name})=>name.toLowerCase().includes(str.toLowerCase()));
      if(founded.length) {
        result = result.concat(founded);
      }
    } else {
      if(region.name.toLowerCase().includes(str.toLowerCase())) {
        result = result.concat(region);
      }
    }

  });

  return result;
}

export const searchCityById = (countryAreas=[], arrId=[]) => {
  let result = [];
  countryAreas.forEach(region=>{

    if(region.areas.length) {
      const founded = region.areas.filter(({id})=>arrId.includes(id));
      if(founded.length) {
        result = result.concat(founded);
      }
    } else {
      if(arrId.includes(region.id)) {
        result = result.concat(region);
      }
    }
  });

  return result;
}
