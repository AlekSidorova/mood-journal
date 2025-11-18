import React from "react";
import type { MoodButtonsProps } from "../../types";
import styles from "./MoodButtons.module.css";

const MoodButtons: React.FC<MoodButtonsProps> = ({
  selectedMood,
  onSelect,
}) => {
  //массив эмодзи
  const moods = ["😄", "😐", "😣"];

  return (
    <div className={styles.container}>
      {moods.map((emoji) => (
        <button
          key={emoji}
          type="button"
          className={
            selectedMood === emoji
              ? `${styles.button} ${styles.buttonSelected}`
              : styles.button
          }
          onClick={() => onSelect(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default MoodButtons;
