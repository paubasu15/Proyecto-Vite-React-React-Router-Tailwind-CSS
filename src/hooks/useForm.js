import { useState, useCallback } from 'react';

/**
 * Hook personalizado para gestionar el estado, la validación y el envío de formularios en React.
 *
 * @param {object} initialValues - Objeto con los valores iniciales del formulario.
 * @param {object} validationRules - Objeto donde cada clave es el nombre de un campo y el valor es un array de funciones de validación.
 * @returns {object} - Un objeto con el estado del formulario y los manejadores de eventos.
 */
const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Valida un campo específico basado en sus reglas de validación.
   * @param {string} name - El nombre del campo a validar.
   * @param {*} value - El valor del campo a validar.
   * @returns {string|null} - El mensaje de error si la validación falla, o null si es válido.
   */
  const validateField = useCallback(
    (name, value) => {
      const rules = validationRules[name];
      if (!rules) return null;

      for (const rule of rules) {
        // Cada 'rule' es una función de validación que recibe el valor del campo y todos los valores del formulario.
        const error = rule(value, values);
        if (error) return error;
      }
      return null;
    },
    [validationRules, values]
  );

  /**
   * Valida todos los campos del formulario.
   * @returns {boolean} - `true` si el formulario es válido, `false` en caso contrario.
   */
  const validateForm = useCallback(() => {
    let isValid = true;
    const newErrors = {};

    Object.keys(validationRules).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField, validationRules]);

  /**
   * Manejador para el evento `onChange` de los campos del formulario.
   * @param {React.ChangeEvent<HTMLInputElement>} e - El evento del cambio.
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setValues((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Validar en tiempo real solo si el campo ya ha sido "tocado".
    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  /**
   * Manejador para el evento `onBlur` de los campos. Marca un campo como "tocado" y lo valida.
   * @param {React.FocusEvent<HTMLInputElement>} e - El evento de foco.
   */
  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, values[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  /**
   * Establece el valor de un campo de forma programática.
   * @param {string} name - El nombre del campo.
   * @param {*} value - El nuevo valor para el campo.
   */
  const setFieldValue = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  /**
   * Establece un error para un campo específico manualmente.
   * @param {string} name - El nombre del campo.
   * @param {string} error - El mensaje de error.
   */
  const setFieldError = (name, error) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  /**
   * Crea un manejador de `onSubmit` para el formulario.
   * @param {function(object): Promise<void>|void} onSubmit - La función a ejecutar con los valores del formulario si es válido.
   * @returns {function(React.FormEvent<HTMLFormElement>): Promise<void>} - El manejador del evento submit.
   */
  const handleSubmit = (onSubmit) => async (e) => {
    e.preventDefault();

    // Marcar todos los campos como "tocados" para mostrar todos los errores.
    const allTouched = Object.keys(validationRules).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    const isValid = validateForm();

    if (isValid && onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        // Aquí podrías usar setFieldError para mostrar un error general o del servidor.
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  /**
   * Resetea el formulario a sus valores iniciales.
   */
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    /**
     * Indica si no hay errores actualmente en el estado de errores.
     * Nota: Para una validación completa antes de enviar, confíe en la validación dentro de `handleSubmit`.
     */
    isValid: Object.values(errors).every((error) => error === null),
  };
};

export default useForm;
