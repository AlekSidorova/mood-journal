import React from "react";
import type { CardProps } from "../../types/index";
import styles from "./MoodCard.module.css";
import { moodImage } from "../../utils/moodImages";

const MoodCard: React.FC<CardProps> = ({ entry }) => {
  const moodIcon = moodImage[entry.mood];

  const date = new Date(entry.date);
  const dateString = date.toLocaleDateString([], {
    day: "2-digit",
    month: "2-digit",
  });
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <div className={styles.dateContainer}>
          <span className={styles.date}>{dateString}</span>
          <span className={styles.time}>{timeString}</span>
        </div>

        <div className={styles.moodTextLetter}>
          <img src={moodIcon} alt={entry.mood} className={styles.moodIcon} />
          <div
            className={styles.noteContainer}
            style={{ backgroundColor: entry.color }}
          >
            <p className={styles.note}>{entry.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodCard;
