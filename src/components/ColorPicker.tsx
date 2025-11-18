import React from "react";
import type { ColorPickerProps } from "../types";
import { COLORS } from "../constants/colors";

const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-2 my-4">
      <label className="text-sm text-gray-700">Цвет дня</label>

      <div className="flex gap-3">
        {COLORS.map((color) => (
          <button
            key={color}
            type="button"
            className={`
              w-8 h-8 rounded-full border-2
              ${selectedColor === color ? "border-black" : "border-transparent"}
              `}
            style={{ backgroundColor: color }}
            onClick={() => onSelect(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
