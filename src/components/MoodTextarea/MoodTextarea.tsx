import React from "react";
import type { MoodTextareaProps } from "../../types";
import styles from "./MoodTextarea.module.css";
import { moodImage } from "../../utils/moodImages";

const MoodTextarea: React.FC<MoodTextareaProps> = ({
  value,
  onChange,
  selectedColor,
  selectedMood,
}) => {
  if (!selectedColor || !selectedMood) return null;

  const moodIcon = moodImage[selectedMood];

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <div
          className={styles.colorPreview}
          style={{ backgroundColor: selectedColor }}
        />
        <img src={moodIcon} alt="emoji" className={styles.moodIcon} />
      </div>

      <div className={styles.content}>
        <label className={styles.label}>Заметка</label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.textarea}
          placeholder="Как прошел день?"
        />
      </div>
      <button type="submit" className={styles.saveButton}>
        Сохранить
      </button>
    </div>
  );
};

export default MoodTextarea;