import React, { useEffect, useState } from "react";
import type { MoodEntry } from "../../types";
import { getMoodEntries } from "../../utils/storage";
import styles from "./MoodList.module.css";
import MoodCard from "../../components/MoodCard/MoodCard";

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
        <MoodCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default MoodList;
