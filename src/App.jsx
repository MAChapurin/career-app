import PAGES from "./constants/PAGES";
import Layout from "./components/layout/Layout";
import Vacancies from "./pages/vacancies/Vacancies";
import usePages from "./store/usePages";
import DetailVacancyPage from "./pages/detailVacancyPage/DetailVacancyPage";

const App = () => {
  const { currentPage } = usePages();

  return (
    <Layout>
      {currentPage === PAGES.vacancies && <Vacancies />}
      {currentPage === PAGES.vacancyDescription && <DetailVacancyPage />}
    </Layout>
  );
};

export default App;
