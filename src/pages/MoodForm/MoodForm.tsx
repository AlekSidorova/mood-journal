import React, { useState, useEffect, useCallback } from "react";
import type { MoodEntry } from "../../types";
import MoodButtons from "../../components/MoodButtons/MoodButtons";
import MoodTextarea from "../../components/MoodTextarea/MoodTextarea";
import ColorPicker from "../../components/ColorPicker/ColorPicker";
import { addMoodEntry } from "../../utils/storage";
import HelpButton from "../../components/HelpButton/HelpButton";
import OnboardingHint from "../../components/OnboardingHint/OnboardingHint";
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

  //состояния для подсказок
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(false);
  const [onboardingStep, setOnboardingStep] = useState<number>(0);

  //проверка первого входа
  useEffect(() => {
    const seen = localStorage.getItem("hasSeenOnboarding");

    if (!seen) {
      setHasSeenOnboarding(false);
      setOnboardingStep(0);
    } else {
      setHasSeenOnboarding(true);
    }
  }, []);

  //логика переключения цветов
  const handleColorSelect = (selected: string) => {
    setColor(selected);

    if (!hasSeenOnboarding && onboardingStep === 0) {
      setOnboardingStep(1);
    }
  };

  // Универсальный обработчик закрытия
  const handleClose = useCallback(() => {
    setNote("");
    setMood("");
    setColor("");
    setIsOpen(false);
  }, []);

  // закрытие по ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  // обработчик выбора настроения
  const handleMoodSelect = (selected: string) => {
    setMood(selected);

    if (!hasSeenOnboarding && onboardingStep === 1) {
      setOnboardingStep(2);
    }

    if (color) setIsOpen(true); // открываем заметку только если цвет уже выбран
  };

  // универсальный handleSubmit для формы и кнопки
  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();

    //после первой отправки заметки
    if (!hasSeenOnboarding) {
      localStorage.setItem("hasSeenOnboarding", "true");
      setHasSeenOnboarding(true);
    }

    if (!note.trim()) return; // запретить пустую заметку

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood,
      note,
      color,
    };

    addMoodEntry(newEntry);

    // очистка и закрытие заметки
    handleClose();
  };

  //разметка формы
  return (
    <div className={styles.formWrapper}>
      <HelpButton />
      {/* форма */}
      <form onSubmit={handleSubmit}>
        <h3 className={styles.color}>Цвет дня</h3>
        <ColorPicker selectedColor={color} onSelect={handleColorSelect} />

        <h2 className={styles.mood}>
          Как ты себя
          <br /> чувствуешь?
        </h2>
        <MoodButtons selectedMood={mood} onSelect={handleMoodSelect} />
      </form>

      {/* блюр и клик для закрытия */}
      {isOpen && <div className={styles.blurOverlay} onClick={handleClose} />}

      {/* заметка поверх всего */}
      {isOpen && (
        <MoodTextarea
          value={note}
          onChange={setNote}
          selectedColor={color}
          selectedMood={mood}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      )}

      {!hasSeenOnboarding && <OnboardingHint step={onboardingStep} />}
    </div>
  );
};

export default MoodForm;
