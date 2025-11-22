import React, { useState, useEffect } from "react";
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

  //состояние открытия и закрытия заметки
  const [isOpen, setIsOpen] = useState(false);

  // закрытие по ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // обработчик выбора настроения
  const handleMoodSelect = (selected: string) => {
    setMood(selected);
    if (color) setIsOpen(true); // открываем заметку только если цвет уже выбран
  };

  // универсальный handleSubmit для формы и кнопки
  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood,
      note,
      color,
    };

    addMoodEntry(newEntry);

    // очистка и закрытие заметки
    setMood("");
    setNote("");
    setColor("");
    setIsOpen(false);
  };

  //разметка формы
  return (
    <div className={styles.formWrapper}>
      {/* форма */}
      <form onSubmit={handleSubmit}>
        <h3 className={styles.color}>Цвет дня</h3>
        <ColorPicker selectedColor={color} onSelect={setColor} />

        <h2 className={styles.mood}>
          Как ты себя
          <br /> чувствуешь?
        </h2>
        <MoodButtons selectedMood={mood} onSelect={handleMoodSelect} />
      </form>

      {/* блюр и клик для закрытия */}
      {isOpen && (
        <div
          className={styles.blurOverlay}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* заметка поверх всего */}
      {isOpen && (
        <MoodTextarea
          value={note}
          onChange={setNote}
          selectedColor={color}
          selectedMood={mood}
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default MoodForm;
