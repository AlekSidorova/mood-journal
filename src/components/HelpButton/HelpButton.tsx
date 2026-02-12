import React from "react";
import styles from "./HelpButton.module.css";
import type { HelpButtonProps } from "../../types";

const HelpButton: React.FC<HelpButtonProps> = ({ onClick }) => {
  return (
    <>
      <button
        className={styles.button}
        onClick={onClick}
        aria-label="Показать обучение"
      >
        ?
      </button>
    </>
  );
};

export default HelpButton;
