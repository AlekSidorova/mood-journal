import React from "react";
import type { MoodTextareaProps } from "../types";

const MoodTextarea: React.FC<MoodTextareaProps> = ({ value, onChange }) => {
  //сразу возвращаем разметку
  return (
    <div className="flex xlex-col gap-2 my-4">
      <label className="text-sm text-gray-700">Заметка</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg p-2 resize-none h-24"
        placeholder="Как прошел день?"
      />
    </div>
  );
};

export default MoodTextarea;
