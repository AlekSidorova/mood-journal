import React, { useState, useEffect, useCallback } from "react";
import type { MoodEntry, MoodFormProps } from "../../types";
import MoodButtons from "../../components/MoodButtons/MoodButtons";
import MoodTextarea from "../../components/MoodTextarea/MoodTextarea";
import ColorPicker from "../../components/ColorPicker/ColorPicker";
import HelpButton from "../../components/HelpButton/HelpButton";
import OnboardingHint from "../../components/OnboardingHint/OnboardingHint";
import styles from "./MoodForm.module.css";

const MoodForm: React.FC<MoodFormProps> = ({ onAddEntry }) => {
  //хранит текущее значение настроения-изначально оно пустое
  const [mood, setMood] = useState<string>("");
  //заметка о настроении
  const [note, setNote] = useState<string>("");
  //выбранный цвет настроения
  const [color, setColor] = useState<string>("");
  //состояние открытия и закрытия заметки
  const [isOpen, setIsOpen] = useState(false);
  //состояние для кнопки помощи
  const [isManualOnboarding, setIsManualOnboarding] = useState(false);

  //обработчкик кнопки
  //(если подсказки открыты - закртыть и наоборот)
  const handleHelpClick = () => {
    if (isManualOnboarding) {
      setIsManualOnboarding(false);
    } else {
      setIsManualOnboarding(true);
      setOnboardingStep(0);
    }
  };

  //состояния для подсказок
  //проверка первого входа
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(() => {
    return localStorage.getItem("hasSeenOnboarding") === "true";
  });

  const [onboardingStep, setOnboardingStep] = useState<number>(() => {
    return localStorage.getItem("hasSeenOnboarding") === "true" ? -1 : 0;
  });

  const isOnboardingActive = !hasSeenOnboarding || isManualOnboarding;

  //логика переключения цветов
  const handleColorSelect = (selected: string) => {
    setColor(selected);

    //открываем модалку
    if (mood && selected && !isOpen) {
      setIsOpen(true);
    }

    //для повторного открытия подсказок
    if (isOnboardingActive && onboardingStep === 0) {
      setOnboardingStep(1);
    }
  };

  // Универсальный обработчик закрытия
  const handleClose = useCallback(() => {
    setNote("");
    setMood("");
    setColor("");
    setIsOpen(false);

    //после закрытия модалки подсказка сбрасывается на начало
    setOnboardingStep(0);
  }, [setOnboardingStep]);

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

    //открываем модалку
    if (color && selected && !isOpen) {
      setIsOpen(true);
    }

    if (isOnboardingActive && onboardingStep === 1) {
      setOnboardingStep(2);
    }
  };

  // универсальный handleSubmit для формы и кнопки
  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();

    if (!note.trim()) return; // запретить пустую заметку

    if (isManualOnboarding) {
      setIsManualOnboarding(false);
    }

    //после первой отправки заметки
    if (!hasSeenOnboarding) {
      localStorage.setItem("hasSeenOnboarding", "true");
      setHasSeenOnboarding(true);
    }

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood,
      note,
      color,
    };

    onAddEntry(newEntry);

    // очистка и закрытие заметки
    handleClose();
  };

  //разметка формы
  return (
    <div className={styles.formWrapper}>
      <HelpButton onClick={handleHelpClick} />
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

      {isOnboardingActive && <OnboardingHint step={onboardingStep} />}
    </div>
  );
};

export default MoodForm;
