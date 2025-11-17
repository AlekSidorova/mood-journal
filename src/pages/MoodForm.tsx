import React, { useState } from "react";
import type { MoodEntry } from "../types";
import MoodButtons from "../components/MoodButtons"

const MoodForm: React.FC = () => {
  //хранит текущее значение настроения-изначально оно пустое
  const [mood, setMood] = useState<string>("");
  //заметка о настроении
  const [note, setNote] = useState<string>("");
  //выбранный цвет настроения
  const [color, setColor] = useState<string>("");

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

    //ВРЕМЕННО логирование новой записи
    console.log("Новая запись:", newEntry);

    //ВРЕМЕННО очистка форм
    setMood("");
    setNote("");
    setColor("");
  };

  //разметка формы
  return (
    <form onSubmit={handleSubmit}>
      <h2>Добавить запись настроения</h2>
      <MoodButtons selectedMood={mood} onSelect={setMood} />
      <button type="submit">Сохранить</button>
    </form>
  );
};

//экпортируем чтобы мы могли его использовать как комопнент
export default MoodForm;
