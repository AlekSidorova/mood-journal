import type { MoodEntry } from "../types";
import { STORAGE_KEYS } from "../constants/storage";

//функция для получения всех записей из localStorage
export const getMoodEntries = (): MoodEntry[] => {
  //с помощью метода getItem извлекаем данные по ключу
  const data = localStorage.getItem(STORAGE_KEYS.MOOD_ENTRIES);

  //если данные есть - они будут распарсены из строки JSON в массив объектов
  //если нет-пустой массив
  return data ? JSON.parse(data) : [];
};

//функция для добавления новой записи
export const addMoodEntry = (entry: MoodEntry) => {
  //вызываем getMoodEntries для получения массива записей
  const entries = getMoodEntries();

  console.log("➡️ Добавляем новую запись:", entry);
  console.log("📦 Текущий список записей ДО сохранения:", entries);

  //новая запись(переданная в параметре entry) добавляется в массив entries
  entries.push(entry);

  console.log("📦 Список записей ПОСЛЕ добавления:", entries);

  //массив entries (со всеми записями и новыми и старыми) переобразовыввется обратно в JSON
  //и сохраняется в localStorage по тому же ключу
  localStorage.setItem(STORAGE_KEYS.MOOD_ENTRIES, JSON.stringify(entries));

  console.log("💾 Данные сохранены в localStorage!");
};
