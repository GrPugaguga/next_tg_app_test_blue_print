import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Получаем сохраненное значение из localStorage или используем initialValue
  const getStoredValue = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Ошибка при получении данных из localStorage:', error);
      return initialValue;
    }
  };

  // Состояние для хранения текущего значения
  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Функция для обновления значения в state и localStorage
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Ошибка при сохранении данных в localStorage:', error);
    }
  };

  // Синхронизация с localStorage при изменении ключа
  useEffect(() => {
    setStoredValue(getStoredValue());
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
