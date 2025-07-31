/**
 * Colección de funciones de validación básicas.
 * Cada función es un "generador" que puede aceptar parámetros de configuración (como el mensaje de error)
 * y retorna la función de validación final.
 */
export default {
  /**
   * Valida que un campo no esté vacío.
   * @param {string} [message='Este campo es requerido'] - Mensaje de error personalizado.
   * @returns {function(any): (string|null)} - La función validadora.
   */
  required:
    (message = 'Este campo es requerido') =>
    (value) => {
      if (
        value === null ||
        value === undefined ||
        value === false ||
        (typeof value === 'string' && value.trim() === '')
      ) {
        return message;
      }
      return null;
    },

  /**
   * Valida que el valor sea una dirección de correo electrónico válida.
   * @param {string} [message='Email inválido'] - Mensaje de error personalizado.
   * @returns {function(string): (string|null)} - La función validadora.
   */
  email:
    (message = 'Email inválido') =>
    (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        return message;
      }
      return null;
    },

  /**
   * Valida que la longitud de un string sea como mínimo la especificada.
   * @param {number} min - La longitud mínima requerida.
   * @param {string} [message] - Mensaje de error personalizado.
   * @returns {function(string): (string|null)} - La función validadora.
   */
  minLength: (min, message) => (value) => {
    if (value && value.length < min) {
      return message || `Debe tener al menos ${min} caracteres`;
    }
    return null;
  },

  /**
   * Valida que la longitud de un string sea como máximo la especificada.
   * @param {number} max - La longitud máxima permitida.
   * @param {string} [message] - Mensaje de error personalizado.
   * @returns {function(string): (string|null)} - La función validadora.
   */
  maxLength: (max, message) => (value) => {
    if (value && value.length > max) {
      return message || `No debe tener más de ${max} caracteres`;
    }
    return null;
  },

  /**
   * Valida que el valor sea un número.
   * @param {string} [message='El valor debe ser numérico'] - Mensaje de error personalizado.
   * @returns {function(any): (string|null)} - La función validadora.
   */
  isNumeric:
    (message = 'El valor debe ser numérico') =>
    (value) => {
      if (value && isNaN(Number(value))) {
        return message;
      }
      return null;
    },

  /**
   * Valida que el valor sea una URL válida.
   * @param {string} [message='URL inválida'] - Mensaje de error personalizado.
   * @returns {function(string): (string|null)} - La función validadora.
   */
  isUrl:
    (message = 'URL inválida') =>
    (value) => {
      try {
        if (value) new URL(value);
        return null;
      } catch (_) {
        return message;
      }
    },
};
