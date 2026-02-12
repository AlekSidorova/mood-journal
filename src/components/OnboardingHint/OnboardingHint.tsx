import React from "react";
import styles from "./OnboardingHint.module.css";
import type { OnboardingProps } from "../../types";

const messages = [
  "Выбери цвет дня 🎨",
  "Отметь настроение 💭",
  "Добавь заметку ✍️",
];

const OnboardingHint: React.FC<OnboardingProps> = ({ step }) => {
  if (step > 2) return null;

  return (
    <div className={`${styles.hint} ${styles[`step${step}`]}`}>
      {messages[step]}
    </div>
  );
};

export default OnboardingHint;
