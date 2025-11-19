import React from "react";
import type { MoodButtonsProps } from "../../types";
import styles from "./MoodButtons.module.css";
//эмодзи настроений
import Good from '../../assets/images/moods/good_mood.svg';
import Neutral from '../../assets/images/moods/neutral_mood.svg';
import Sad from '../../assets/images/moods/sad_ mood.svg';

const MoodButtons: React.FC<MoodButtonsProps> = ({
  selectedMood,
  onSelect,
}) => {
  //массив эмодзи
  const moods = [
    { id: 'good', img: Good },
    { id: 'neutral', img: Neutral },
    { id: 'sad', img: Sad},
  ];

  return (
    <div className={styles.container}>
      {moods.map((mood) => (
        <button
          key={mood.id}
          type="button"
          className={
            selectedMood === mood.id
              ? `${styles.button} ${styles.buttonSelected}`
              : styles.button
          }
          onClick={() => onSelect(mood.id)}
        >
          <img src={mood.img} alt={mood.img} className={styles.moodImg} />
        </button>
      ))}
    </div>
  );
};

export default MoodButtons;
