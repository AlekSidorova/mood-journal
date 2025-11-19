import React, { useEffect, useState } from "react";
import type { MoodEntry } from "../../types";
import { getMoodEntries } from "../../utils/storage";
import styles from "./MoodList.module.css";

const MoodList: React.FC = () => {
  //entries-массив, который хранит записи о настроении
  //setEntries-обвновление состояния entries
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    //функция, которая бужет загружать данные о записях
    const fetchEntries = () => {
      const data = getMoodEntries();
      setEntries([...data].reverse()); // создаём новый массив и показываем новые записи сверху
    };

    fetchEntries();
  }, []);

  return (
    <div className={styles.listContainer}>
      {entries.length === 0 && <p className={styles.empty}>Нет записей</p>}
      {entries.map((entry) => (
        <div
          key={entry.id}
          className={styles.card}
          style={{ backgroundColor: entry.color }}
        >
          <div className={styles.header}>
            <span className={styles.date}>
              {new Date(entry.date).toLocaleDateString()}
            </span>
            <span className={styles.mood}>{entry.mood}</span>
          </div>
          <p className={styles.note}>{entry.note}</p>
        </div>
      ))}
    </div>
  );
};

export default MoodList;
