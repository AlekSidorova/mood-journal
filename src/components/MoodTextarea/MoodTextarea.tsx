import React from "react";
import type { MoodTextareaProps } from "../../types";
import styles from "./MoodTextarea.module.css";

const MoodTextarea: React.FC<MoodTextareaProps> = ({ value, onChange }) => {
  //сразу возвращаем разметку
  return (
    <div className={styles.container}>
      <label className={styles.label}>Заметка</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.textarea}
        placeholder="Как прошел день?"
      />
    </div>
  );
};

export default MoodTextarea;
