/**
 * Colección de funciones de validación avanzadas que a menudo dependen de otros campos del formulario.
 */
export default {
  /**
   * Valida que el valor de un campo coincida con el campo 'password'.
   * @param {string} [message='Las contraseñas no coinciden'] - Mensaje de error personalizado.
   * @returns {function(string, object): (string|null)} - La función validadora.
   */
  confirmPassword:
    (message = 'Las contraseñas no coinciden') =>
    (value, allValues) => {
      if (value !== allValues.password) {
        return message;
      }
      return null;
    },

  /**
   * Valida que la fecha de fin sea posterior a la de inicio.
   * @param {string} [message='La fecha de fin debe ser posterior a la de inicio'] - Mensaje de error personalizado.
   * @returns {function(string|Date, object): (string|null)} - La función validadora.
   */
  endDateAfterStart:
    (message = 'La fecha de fin debe ser posterior a la de inicio') =>
    (value, allValues) => {
      if (
        value &&
        allValues.startDate &&
        new Date(value) <= new Date(allValues.startDate)
      ) {
        return message;
      }
      return null;
    },

  /**
   * Valida un número de teléfono mexicano, solo si el país seleccionado es 'Mexico'.
   * @param {string} [message='Formato de teléfono mexicano inválido'] - Mensaje de error personalizado.
   * @returns {function(string, object): (string|null)} - La función validadora.
   */
  mexicanPhone:
    (message = 'Formato de teléfono mexicano inválido') =>
    (value, allValues) => {
      if (allValues.country === 'Mexico' && value) {
        // Regex para 10 dígitos, opcionalmente con prefijo +52 y espacios.
        const phoneRegex = /^(\+52\s?)?[0-9]{10}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
          return message;
        }
      }
      return null;
    },

  /**
   * Valida la fortaleza de una contraseña.
   * @param {object} [options] - Opciones de configuración.
   * @param {number} [options.minLength=8] - Longitud mínima.
   * @param {boolean} [options.requireUppercase=true] - Requerir mayúsculas.
   * @param {boolean} [options.requireLowercase=true] - Requerir minúsculas.
   * @param {boolean} [options.requireNumbers=true] - Requerir números.
   * @param {boolean} [options.requireSymbols=true] - Requerir símbolos.
   * @param {string} [message] - Mensaje de error personalizado y único.
   * @returns {function(string): (string|null)} - La función validadora.
   */
  passwordStrength:
    (options = {}, message) =>
    (value) => {
      if (message) {
        // Si se provee un mensaje general, se usa ese.
        const checks = [
          options.minLength !== false && `.{${options.minLength || 8},}`,
          options.requireUppercase !== false && `(?=.*[A-Z])`,
          options.requireLowercase !== false && `(?=.*[a-z])`,
          options.requireNumbers !== false && `(?=.*[0-9])`,
          options.requireSymbols !== false && `(?=.*[!@#$%^&*])`,
        ]
          .filter(Boolean)
          .join('');
        const regex = new RegExp(`^${checks}.*$`);
        if (value && !regex.test(value)) return message;
        return null;
      }

      // Mensajes de error específicos si no se provee uno general.
      const config = {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSymbols: true,
        ...options,
      };
      if (!value) return null; // La regla 'required' debe manejar esto.
      if (value.length < config.minLength)
        return `Debe tener al menos ${config.minLength} caracteres.`;
      if (config.requireUppercase && !/(?=.*[A-Z])/.test(value))
        return 'Debe contener al menos una mayúscula.';
      if (config.requireLowercase && !/(?=.*[a-z])/.test(value))
        return 'Debe contener al menos una minúscula.';
      if (config.requireNumbers && !/(?=.*[0-9])/.test(value))
        return 'Debe contener al menos un número.';
      if (config.requireSymbols && !/(?=.*[!@#$%^&*])/.test(value))
        return 'Debe contener al menos un símbolo (!@#$%^&*).';

      return null;
    },
};
