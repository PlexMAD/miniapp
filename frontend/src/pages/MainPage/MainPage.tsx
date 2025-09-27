import { PageHeader } from "../../components/PageHeader";
import styles from "./Mainpage.module.scss"

export const MainPage = () => {
  return (
    <div className={styles.header}>
      <PageHeader>Список игр</PageHeader>
    </div>
  );
};

export default MainPage;
