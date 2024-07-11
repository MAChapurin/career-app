import { APP_PAGE } from '@constants';
import { Main } from '@pages/Main/Main';
import { DetailVacancy } from '@pages/DetailVacancy/DetailVacancy';
import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import { useRouteStore } from '@store/routeStore';

import styles from './App.module.css';

const App = () => {
  const { pageApp } = useRouteStore()
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        {pageApp === APP_PAGE.main && <Main />}
        {pageApp === APP_PAGE.vacancy && <DetailVacancy />}
        <Footer />
      </div>
    </>
  );
};

export default App;
