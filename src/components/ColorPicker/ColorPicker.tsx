import React from "react";
import type { ColorPickerProps } from "../../types";
import { COLORS } from "../../constants/colors";
import styles from "./ColorPicker.module.css";

const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onSelect,
}) => {
  return (
    <div className={styles.container}>

      <div className={styles.colors}>
        {COLORS.map((color) => (
          <button
            key={color}
            type="button"
            className={
              selectedColor === color
                ? `${styles.colorButton} ${styles.colorButtonSelected}`
                : styles.colorButton
            }
            style={{ backgroundColor: color }}
            onClick={() => onSelect(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
