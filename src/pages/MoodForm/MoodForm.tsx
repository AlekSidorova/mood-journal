import React, { useState } from "react";
import type { MoodEntry } from "../../types";
import MoodButtons from "../../components/MoodButtons/MoodButtons";
import MoodTextarea from "../../components/MoodTextarea/MoodTextarea";
import ColorPicker from "../../components/ColorPicker/ColorPicker";
import { addMoodEntry } from "../../utils/storage";
import styles from "./MoodForm.module.css";

const MoodForm: React.FC = () => {
  //хранит текущее значение настроения-изначально оно пустое
  const [mood, setMood] = useState<string>("");
  //заметка о настроении
  const [note, setNote] = useState<string>("");
  //выбранный цвет настроения
  const [color, setColor] = useState<string>("");

  const showOverlay = color && mood;

  //функция отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //создание новой записи о настроении
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood,
      note,
      color,
    };

    //добавляем новую запись
    addMoodEntry(newEntry);

    //ВРЕМЕННО очистка форм
    setMood("");
    setNote("");
    setColor("");
  };

  //разметка формы
  return (
    <div className={styles.formWrapper}>
      {/* Размытие на фоне */}
      {showOverlay && <div className={styles.blurOverlay} />}

      {/* Сама форма */}
      <form onSubmit={handleSubmit}>
        <h3 className={styles.color}>Цвет дня</h3>
        <ColorPicker selectedColor={color} onSelect={setColor} />

        <h2 className={styles.mood}>
          Как ты себя
          <br /> чувствуешь?
        </h2>
        <MoodButtons selectedMood={mood} onSelect={setMood} />

        {/* Всплывающее окно заметки */}
        <MoodTextarea
          value={note}
          onChange={setNote}
          selectedColor={color}
          selectedMood={mood}
        />
      </form>
    </div>
  );
};

export default MoodForm;
