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
  value: string; //текущее значение текстового поля
  onChange: (value: string) => void; //изменения текста
};
