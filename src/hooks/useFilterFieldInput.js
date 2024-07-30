import { useRef, useState } from "react";
import { useOutsideAlerter } from "./useOutsideAlerter";
import { searchCityByName } from "../utils/searchCity";
import useVacanciesStore from "../store/useVacanciesStore";


const useFilterFieldInput = ({data}) => {
  const [input, setInput] = useState('');
  const [opened, setOpened] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [showCross, setShowCross] = useState(false);
  const [searchList, setSearchList] = useState([]);

  const [checkedCityList, setCheckedCityList] = useVacanciesStore((state) => [
    state.checkedCityList,
    state.setCheckedCityList
  ]);


  const ref = useRef(null);
  useOutsideAlerter(ref, () => {
    setOpened(false);
  });


  const handleSetInput = (e) => {
    checkInput(e.target.value);
  }

  const checkInput = (value) => {

    setInput(value);
    setShowCross(!!value.length);

    let flagOpen = true;

    if(data && value.length >=3) {

      flagOpen = false;
      const result = searchCityByName(data.areas, value);

      flagOpen = !!result.length;
      setSearchList(result);
    } else {
      flagOpen = false;
      setSearchList([]);
    }

    setOpened(flagOpen || checkedCityList.length);
  }

  const handleReset = () => {
    checkInput('');
    setInputFocus(false);
  }

  const handleSetFocus = () => {
    setInputFocus(true);
    setOpened(input.length >=3 && searchList.length || checkedCityList.length);
  }

  const handleSetBlur = () => {
    setInputFocus(false);
  }

  return {
    input,
    handleSetInput,
    inputFocus,
    handleSetFocus,
    handleSetBlur,
    handleReset,
    showCross,
    opened,
    ref,
    searchList,
    checkedCityList,
    setCheckedCityList
  };
};

export default useFilterFieldInput;
