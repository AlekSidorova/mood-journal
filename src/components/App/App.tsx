import React, { useState } from "react";
import MoodForm from "../../pages/MoodForm/MoodForm";
import MoodList from "../../pages/MoodList/MoodList";
import { getMoodEntries, addMoodEntry } from "../../utils/storage";
import type { MoodEntry } from "../../types";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [entries, setEntries] = useState<MoodEntry[]>(() =>
    getMoodEntries().reverse(),
  );

  const handleAddEntry = (newEntry: MoodEntry) => {
    addMoodEntry(newEntry); //сохраняем
    setEntries(prev => [newEntry, ...prev]); //обновляем UI
  };

  return (
    <div className={styles.app}>
      <div className={styles.moodBackground}>
        <MoodForm onAddEntry={handleAddEntry} />
        <MoodList entries={entries}/>
      </div>
    </div>
  );
};

export default App;
