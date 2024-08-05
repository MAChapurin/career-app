import { useLayoutEffect, useState } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useLayoutEffect(() => {
    const matchQueryList = window.matchMedia(query);
    setMatches(matchQueryList.matches);
    const handleChange = (e) => {
      setMatches(e.matches);
    };

    matchQueryList.addEventListener("change", handleChange);
    return () => matchQueryList.removeEventListener("change", handleChange);
  }, []);

  return matches;
};

export default useMediaQuery;
