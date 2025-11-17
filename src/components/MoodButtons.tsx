import React from "react";
import type { MoodButtonsProps } from "../types";

const MoodButtons: React.FC<MoodButtonsProps> = ({
  selectedMood,
  onSelect,
}) => {
  //массив эмодзи
  const moods = ["😄", "😐", "😣"];

  return (
    <div className="flex gap-4 my-4">
      {moods.map((emoji) => (
        <button
          key={emoji}
          type="button"
          className={`text-2x1 p-2 rounded-full border-2 ${
            selectedMood === emoji ? "border-blue-500" : "border-transparent"
          }`}
          onClick={() => onSelect(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default MoodButtons;
