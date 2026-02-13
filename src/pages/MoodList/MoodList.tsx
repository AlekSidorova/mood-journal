import React, { useState, useRef } from "react";
import type { MoodListProps } from "../../types";
import styles from "./MoodList.module.css";
import MoodCard from "../../components/MoodCard/MoodCard";

//сколько записей подгружаем за раз
const ITEMS_PER_LOAD = 5;

const MoodList: React.FC<MoodListProps> = ({ entries }) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleEntries = entries.slice(0, visibleCount);

  //функция подгрузки следующей порции
  const loadMore = () => {
    //проверочка
    if (visibleCount >= entries.length) return;

    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_LOAD, entries.length));
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
        <p className={styles.empty}>
          Здесь пока нет записей. Начни с выбора цвета и настроения 💞
        </p>
      )}
      {visibleEntries.map((entry) => (
        <MoodCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default MoodList;
