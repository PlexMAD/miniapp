import { Link } from "react-router-dom";
import styles from "./NoCardsLeftBlock.module.scss";

interface NoCardsLeftBlockProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

const NoCardsLeftBlock = ({
  title = "Карточки закончились 🎉",
  description = "Вы посмотрели все варианты!",
  buttonText = "Вернуться на главный экран",
}: NoCardsLeftBlockProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cardBox}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardDescription}>{description}</p>
      </div>
      <Link to="/">
        <button className={styles.nextBtn}>{buttonText}</button>
      </Link>
    </div>
  );
};

export default NoCardsLeftBlock;
