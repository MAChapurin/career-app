import { useEffect, useRef, useState } from "react";
import { useOutsideAlerter } from "./useOutsideAlerter";

const useFilterFieldInput = () => {
  const [input, setInput] = useState('');
  const [opened, setOpened] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [showCross, setShowCross] = useState(false);

  const ref = useRef(null);
  useOutsideAlerter(ref, () => {
    setOpened(false);
  });

  const handleSetInput = (e) => {
    setInput(e.target.value);
  }

  useEffect(()=>{
    setShowCross(!!input.length);
    setOpened(input.length >=3);
  },[input]);

  const handleSetFocus = () => {
    setInputFocus(true);
    setOpened(input.length >=3);
  }

  const handleSetBlur = () => {
    setInputFocus(false);
  }

  const handleReset = () => {
    setInput('');
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
    ref
  };
};

export default useFilterFieldInput;
