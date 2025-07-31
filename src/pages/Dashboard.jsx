import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Productos Total</h3>
          <p className="text-3xl font-bold text-blue-600">125</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Ventas del Mes</h3>
          <p className="text-3xl font-bold text-green-600">$15,450</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Usuarios Activos</h3>
          <p className="text-3xl font-bold text-purple-600">89</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
