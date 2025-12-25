import React, { useEffect, useState, useRef } from "react";
import type { MoodEntry } from "../../types";
import { getMoodEntries } from "../../utils/storage";
import styles from "./MoodList.module.css";
import MoodCard from "../../components/MoodCard/MoodCard";

//сколько записей подгружаем за раз
const ITEMS_PER_LOAD = 5;

const MoodList: React.FC = () => {
  const [allEntries, setAllEntries] = useState<MoodEntry[]>([]);
  const [visibleEntries, setVisibleEntries] = useState<MoodEntry[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = getMoodEntries().reverse();
      setAllEntries(data);
      setVisibleEntries(data.slice(0, ITEMS_PER_LOAD));
    };

    fetchData();
  }, []);

  //функция подгрузки следующей порции
  const loadMore = () => {
    const currentLength = visibleEntries.length;
    const nextEnteries = allEntries.slice(
      currentLength,
      currentLength + ITEMS_PER_LOAD
    );
    setVisibleEntries((prev) => [...prev, ...nextEnteries]);
  };

  //обработка скролла
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    //если дошли до низа
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 10
    ) {
      loadMore();
    }
  };

  return (
    <div
      className={styles.listContainer}
      ref={containerRef}
      onScroll={handleScroll}
    >
      {visibleEntries.length === 0 && (
        <p className={styles.empty}>Нет записей</p>
      )}
      {visibleEntries.map((entry) => (
        <MoodCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default MoodList;
