import { Header } from '@components/Header/Header';
import { Main } from '@components/Main/Main';
import { Footer } from '@components/Footer/Footer';
import { useRouteStore } from '@store/routeStore';

import styles from './App.module.css';
import { APP_PAGE } from '@constants';
import { VacancyDetail } from '@pages/VacancyDetail/VacancyDetail';

const App = () => {
  const { pageApp } = useRouteStore()
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        {pageApp === APP_PAGE.main && <Main />}
        {pageApp === APP_PAGE.vacancy && <VacancyDetail />}

        <Footer />
      </div>
    </>
  );
};

export default App;
