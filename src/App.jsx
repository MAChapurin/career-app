import PAGES from "./constants/PAGES";
import Layout from "./components/layout/Layout";
import Vacancies from "./pages/vacancies/Vacancies";
import AboutVacancy from "./pages/aboutVacancy/AboutVacancy";
import usePages from "./store/usePages";

const App = () => {
  const { currentPage } = usePages();

  return (
    <Layout>
      {currentPage === PAGES.vacancies && <Vacancies />}
      {currentPage === PAGES.vacancyDescription && <AboutVacancy />}
    </Layout>
  );
};

export default App;
