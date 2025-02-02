import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-white">404 - Página no encontrada</h1>
      <p className="text-gray-600">Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-gold text-white rounded-full">
        Volver al Inicio
      </Link>
    </div>
  );
}

export default NotFound;
