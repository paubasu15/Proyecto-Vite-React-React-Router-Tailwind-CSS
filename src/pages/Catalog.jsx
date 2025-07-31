import React from 'react';
import { Link } from 'react-router-dom';

const Catalog = () => {
  const products = [
    {
      id: 1,
      name: 'Laptop Dell',
      price: '$999',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 2,
      name: 'iPhone 14',
      price: '$799',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 3,
      name: 'Samsung TV',
      price: '$1299',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 4,
      name: 'Auriculares Sony',
      price: '$199',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 5,
      name: 'Tablet iPad',
      price: '$549',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 6,
      name: 'Smartwatch',
      price: '$299',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 7,
      name: 'Laptop Dell',
      price: '$999',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 8,
      name: 'iPhone 14',
      price: '$799',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 9,
      name: 'Samsung TV',
      price: '$1299',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 10,
      name: 'Auriculares Sony',
      price: '$199',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 11,
      name: 'Tablet iPad',
      price: '$549',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 12,
      name: 'Smartwatch',
      price: '$299',
      image: 'https://via.placeholder.com/300x200',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Productos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-2xl font-bold text-green-600 mb-4">
                {product.price}
              </p>
              <Link
                to={`/product/${product.id}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full inline-block text-center"
              >
                Ver Detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
