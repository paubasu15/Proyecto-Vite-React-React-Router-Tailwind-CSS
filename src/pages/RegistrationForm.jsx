import React from 'react';
import useForm from '../hooks/useForm';
import basic from '../Validators/basicValidators';
import advanced from '../Validators/advancedValidators';
import InputGroup from '../components/InputGroup';

const RegistrationForm = () => {
  // 1. Definir valores iniciales
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    phone: '',
    website: '',
    terms: false,
  };

  // 2. Definir reglas de validación
  const validationRules = {
    name: [basic.required(), basic.minLength(3)],
    email: [basic.required('El correo es obligatorio'), basic.email()],
    password: [basic.required(), advanced.passwordStrength({ minLength: 8 })],
    confirmPassword: [
      basic.required('Confirma tu contraseña'),
      advanced.confirmPassword('Las contraseñas deben coincidir'),
    ],
    country: [basic.required('Debes seleccionar un país')],
    phone: [advanced.mexicanPhone()],
    website: [basic.isUrl('Por favor, introduce una URL válida')],
    terms: [basic.required('Debes aceptar los términos y condiciones')],
  };

  // 3. Inicializar el hook
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialValues, validationRules);

  // 4. Función de envío
  const handleFormSubmit = async (formData) => {
    console.log('Formulario enviado:', formData);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert('¡Registro exitoso!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-lg w-full">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
          Crear una Cuenta
        </h2>
        <form
          className="bg-white p-8 rounded-lg shadow-lg"
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
        >
          <InputGroup
            label="Nombre Completo"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
            placeholder="Ej. Ana García"
          />

          <InputGroup
            label="Correo Electrónico"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
            placeholder="tu@correo.com"
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
            placeholder="Mínimo 8 caracteres"
          />

          <InputGroup
            label="Confirmar Contraseña"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            placeholder="Repite tu contraseña"
          />

          <InputGroup
            label="País"
            name="country"
            type="select"
            value={values.country}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.country}
            touched={touched.country}
          >
            <option value="">Selecciona uno...</option>
            <option value="Mexico">México</option>
            <option value="USA">Estados Unidos</option>
            <option value="Otro">Otro</option>
          </InputGroup>

          {values.country === 'Mexico' && (
            <div className="mb-4">
              <InputGroup
                label="Teléfono (México)"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone}
                touched={touched.phone}
                placeholder="10 dígitos"
              />
            </div>
          )}

          <InputGroup
            label="Sitio Web (Opcional)"
            name="website"
            value={values.website}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.website}
            touched={touched.website}
            placeholder="https://tusitio.com"
          />

          <div className="mb-6">
            <label className="flex items-center text-gray-700 text-sm">
              <input
                name="terms"
                type="checkbox"
                checked={values.terms}
                onChange={handleChange}
                onBlur={handleBlur}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
              />
              Acepto los términos y condiciones
            </label>
            {touched.terms && errors.terms && (
              <p className="text-red-600 text-xs mt-1">{errors.terms}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
