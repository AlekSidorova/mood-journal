//интрефейс для структуры данных
export interface MoodEntry {
  id: string; //уникальный идентификатор
  date: string; //дата записи
  mood: string; //эмодзи настроения
  note: string; //текст заметки
  color: string; //цвет/категория
};

//интерфейс для кнопок-эмоджи
export interface MoodButtonsProps {
  selectedMood: string; //текущее выбранное настроение(для визуала)
  onSelect: (mood: string) => void; //принимает строку (эмодзи)
};

//интерфейс для поля заметки
export interface MoodTextareaProps {
  value: string; // текущее значение текстового поля
  onChange: (value: string) => void; // изменения текста
  selectedColor: string | null; // выбранный цвет
  selectedMood: string | null; // выбранная эмоция (ключ из moodImage)
  onClose?: () => void; // закрытие заметки
  onSubmit?: (e?: React.FormEvent | React.MouseEvent) => void; // сохранение записи
}

//интерфейс для выбора цвета настроения
export interface ColorPickerProps {
  selectedColor: string; //выбранный цвет
  onSelect: (color: string) => void; //принимаем цвет
};

//интерфейс для карточек
export interface CardProps {
  entry: MoodEntry;
};

//интерфейс для подсказок
export interface OnboardingProps {
  step: number;
};

export interface MoodFormProps {
  onAddEntry: (entry: MoodEntry) => void;
}

export interface MoodListProps {
  entries: MoodEntry[];
}