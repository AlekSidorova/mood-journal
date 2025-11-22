import React from "react";
import type { MoodTextareaProps } from "../../types";
import styles from "./MoodTextarea.module.css";
import { moodImage } from "../../utils/moodImages";

const MoodTextarea: React.FC<MoodTextareaProps> = ({
  value,
  onChange,
  selectedColor,
  selectedMood,
  onClose,
  onSubmit,
}) => {
  if (!selectedColor || !selectedMood) return null;

  const moodIcon = moodImage[selectedMood];

  return (
    <div className={styles.wrapper} style={{ backgroundColor: selectedColor }}>
      {/* Верхняя строка: дата + смайл */}
      <div className={styles.headerRow}>
        <span className={styles.date}>
          {new Date().toLocaleDateString(undefined, {
            day: "2-digit",
            month: "2-digit",
          })}
        </span>
        <img src={moodIcon} alt="emoji" className={styles.moodIcon} />
      </div>

      {/* Текстовая зона */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.textarea}
        placeholder="Как прошел день?"
      />

      {/* Кнопка отправки */}
      <button type="button" className={styles.sendButton} onClick={onSubmit}>
        ➤
      </button>

      {/* Крестик для закрытия */}
      <button type="button" className={styles.closeButton} onClick={onClose}>
        ✕
      </button>
    </div>
  );
};

export default MoodTextarea;
