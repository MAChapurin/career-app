import styles from './App.module.css';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';

const App = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Main />
        <Footer />
      </div>
    </>
  );
};

export default App;
