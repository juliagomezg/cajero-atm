export default function Comprobante({ movimiento, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
          {/* Botón para cerrar el comprobante */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg"
          >
            &times;
          </button>
          
          <h2 className="text-xl font-bold mb-4 text-center">Comprobante</h2>
  
          {/* Detalles del comprobante */}
          <p className="mb-2">
            <strong>Tipo:</strong> {movimiento.tipo}
          </p>
          <p className="mb-2">
            <strong>Monto:</strong> ${movimiento.monto}
          </p>
          <p className="mb-2">
            <strong>Fecha:</strong> {movimiento.fecha}
          </p>
        </div>
      </div>
    );
  }
  