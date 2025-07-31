import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useForm from '../hooks/useForm';
import basic from '../validators/basicValidators';
import InputGroup from '../components/InputGroup';

const Login = () => {
  // --- Hooks y Contexto ---
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState('');

  // --- Lógica de Formulario con useForm ---
  const initialValues = {
    username: '',
    password: '',
  };

  const validationRules = {
    username: [basic.required('El nombre de usuario es requerido')],
    password: [basic.required('La contraseña es requerida')],
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialValues, validationRules);

  // --- Efectos Secundarios ---
  // Redirige al usuario si ya está autenticado.
  useEffect(() => {
    const from = location.state?.from?.pathname || '/dashboard';
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  // --- Manejadores de Eventos ---
  /**
   * Función que se ejecuta al enviar el formulario.
   * Llama a la función de login del contexto y maneja los errores.
   * @param {object} formData - Los datos del formulario (values).
   */
  const handleLoginSubmit = async (formData) => {
    setAuthError('');
    try {
      await login(formData.username, formData.password);
      // La navegación en caso de éxito se maneja en el useEffect.
    } catch (err) {
      // Captura el error de la promesa de login y lo muestra en la UI.
      setAuthError(err.message || 'Ocurrió un error inesperado.');
    }
  };

  // --- Renderizado del Componente ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
        </div>
        <form
          className="bg-white p-8 rounded-lg shadow-lg"
          onSubmit={handleSubmit(handleLoginSubmit)}
          noValidate
        >
          {authError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {authError}
            </div>
          )}

          <InputGroup
            label="Usuario"
            name="username"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username}
            touched={touched.username}
            placeholder="admin"
          />

          <InputGroup
            label="Contraseña"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
            placeholder="password"
          />

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting} // Unificamos el estado de carga con el del hook del formulario
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
