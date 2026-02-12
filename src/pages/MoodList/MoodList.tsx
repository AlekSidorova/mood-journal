import React, { useEffect, useState, useRef } from "react";
import type { MoodEntry, MoodListProps } from "../../types";
import styles from "./MoodList.module.css";
import MoodCard from "../../components/MoodCard/MoodCard";

//сколько записей подгружаем за раз
const ITEMS_PER_LOAD = 5;

const MoodList: React.FC<MoodListProps> = ({ entries }) => {
  const [visibleEntries, setVisibleEntries] = useState<MoodEntry[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleEntries(prev => {
      const newLength = Math.max(prev.length, ITEMS_PER_LOAD);
      return entries.slice(0, newLength);
    });
  }, [entries]);

  //функция подгрузки следующей порции
  const loadMore = () => {
    //маленькая защита от лишней подгрузки
    if (visibleEntries.length >= entries.length) return;
    
    const currentLength = visibleEntries.length;
    const nextEnteries = entries.slice(
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
