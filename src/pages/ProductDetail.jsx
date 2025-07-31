import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = {
    id: parseInt(id),
    name: `Producto ${id}`,
    price: '$999',
    description:
      'Esta es una descripción detallada del producto seleccionado. Incluye todas las características y especificaciones técnicas importantes.',
    image: 'https://via.placeholder.com/500x400',
    specifications: [
      'Especificación 1: Valor importante',
      'Especificación 2: Otra característica',
      'Especificación 3: Más detalles técnicos',
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        ← Volver
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-4xl font-bold text-green-600 mb-6">
            {product.price}
          </p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Descripción</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Especificaciones</h3>
            <ul className="list-disc list-inside text-gray-700">
              {product.specifications.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
          </div>

          <div className="flex space-x-4">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded">
              Comprar Ahora
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded">
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
