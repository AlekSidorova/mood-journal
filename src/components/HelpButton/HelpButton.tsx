import { useState } from "react";
import styles from "./HelpButton.module.css";

const HelpButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={styles.button}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Как работает приложение"
      >
        ?
      </button>

      {isOpen && (
        <div className={styles.tooltipWrapper}>
          <div>
            <h3 className={styles.text}>Как пользоваться</h3>
            <ul className={styles.steps}>
              <li>1. Выбери цвет дня</li>
              <li>2. Отметь настроение</li>
              <li>3. Добавь заметку</li>
            </ul>
            <p>Записи сохраняются автоматически ✨</p>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpButton;
