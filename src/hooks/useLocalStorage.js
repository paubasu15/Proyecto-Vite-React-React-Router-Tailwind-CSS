import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar localStorage de forma reactiva
 * @param {string} key - Clave para localStorage
 * @param {*} initialValue - Valor inicial si no existe en localStorage
 * @returns {[value, setValue, removeValue]} - [valor, función para establecer, función para eliminar]
 */
export const useLocalStorage = (key, initialValue) => {
  // Estado para almacenar nuestro valor
  // Pasamos una función de inicialización a useState para que la lógica
  // solo se ejecute una vez
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Obtener desde localStorage por clave
      const item = window.localStorage.getItem(key);
      // Parsear JSON almacenado o devolver initialValue si no existe
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Si hay error al parsear JSON, devolver initialValue
      console.error(`Error al leer localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Función para establecer valor
  const setValue = (value) => {
    try {
      // Permitir que value sea una función para tener la misma API que useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Guardar estado
      setStoredValue(valueToStore);

      // Guardar en localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error al escribir localStorage key "${key}":`, error);
    }
  };

  // Función para eliminar valor
  const removeValue = () => {
    try {
      // Eliminar del estado
      setStoredValue(initialValue);

      // Eliminar de localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error al eliminar localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

// Versión extendida con más funcionalidades
export const useLocalStorageAdvanced = (key, initialValue, options = {}) => {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    syncData = true, // Sincronizar entre pestañas
  } = options;

  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? deserialize(item) : initialValue;
    } catch (error) {
      console.error(`Error al leer localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, serialize(valueToStore));

        // Disparar evento personalizado para sincronización
        if (syncData) {
          window.dispatchEvent(new Event('local-storage-update'));
        }
      }
    } catch (error) {
      console.error(`Error al escribir localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);

      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);

        if (syncData) {
          window.dispatchEvent(new Event('local-storage-update'));
        }
      }
    } catch (error) {
      console.error(`Error al eliminar localStorage key "${key}":`, error);
    }
  };

  // Sincronizar entre pestañas/ventanas
  useEffect(() => {
    if (!syncData || typeof window === 'undefined') return;

    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(deserialize(e.newValue));
        } catch (error) {
          console.error(
            `Error al sincronizar localStorage key "${key}":`,
            error
          );
        }
      }
    };

    const handleCustomUpdate = () => {
      try {
        const item = window.localStorage.getItem(key);
        const newValue = item ? deserialize(item) : initialValue;
        setStoredValue(newValue);
      } catch (error) {
        console.error(`Error al actualizar localStorage key "${key}":`, error);
      }
    };

    // Escuchar cambios en localStorage (entre pestañas)
    window.addEventListener('storage', handleStorageChange);
    // Escuchar evento personalizado (misma pestaña)
    window.addEventListener('local-storage-update', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-update', handleCustomUpdate);
    };
  }, [key, initialValue, deserialize, syncData]);

  return [storedValue, setValue, removeValue];
};

// Hook específico para manejar arrays en localStorage
export const useLocalStorageArray = (key, initialValue = []) => {
  const [array, setArray, removeArray] = useLocalStorage(key, initialValue);

  const addItem = (item) => {
    setArray((prevArray) => [...prevArray, item]);
  };

  const removeItem = (index) => {
    setArray((prevArray) => prevArray.filter((_, i) => i !== index));
  };

  const updateItem = (index, newItem) => {
    setArray((prevArray) =>
      prevArray.map((item, i) => (i === index ? newItem : item))
    );
  };

  const clearArray = () => {
    setArray([]);
  };

  return {
    array,
    setArray,
    addItem,
    removeItem,
    updateItem,
    clearArray,
    removeArray,
  };
};

// Hook específico para manejar objetos en localStorage
export const useLocalStorageObject = (key, initialValue = {}) => {
  const [object, setObject, removeObject] = useLocalStorage(key, initialValue);

  const updateProperty = (property, value) => {
    setObject((prevObject) => ({
      ...prevObject,
      [property]: value,
    }));
  };

  const removeProperty = (property) => {
    setObject((prevObject) => {
      const newObject = { ...prevObject };
      delete newObject[property];
      return newObject;
    });
  };

  const mergeObject = (newProperties) => {
    setObject((prevObject) => ({
      ...prevObject,
      ...newProperties,
    }));
  };

  return {
    object,
    setObject,
    updateProperty,
    removeProperty,
    mergeObject,
    removeObject,
  };
};
