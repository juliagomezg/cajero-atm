import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import jsPDF from "jspdf";
import Modal from "./Modal";
import Comprobante from "./Comprobante";

// Componente principal del dashboard del cajero automático
export default function Dashboard({ usuario, setUsuarioActual }) {
  // Estado para gestionar el saldo actual
  const [saldo, setSaldo] = useState(usuario.saldo);
  // Estado para mostrar u ocultar el saldo
  const [saldoVisible, setSaldoVisible] = useState(false);
  // Estado para notificaciones push-up
  const [notificacion, setNotificacion] = useState(null);
  // Estado para controlar el modal activo (depósito o retiro)
  const [modal, setModal] = useState(null);
  // Estado para almacenar la última transacción (para el comprobante)
  const [ultimoMovimiento, setUltimoMovimiento] = useState(null);
  // Estado para el historial de transacciones del usuario
  const [historial, setHistorial] = useState(usuario.historial || []);

  /**
   * Muestra una notificación temporal en la pantalla.
   * @param {string} texto - Mensaje a mostrar.
   * @param {string} tipo - Tipo de notificación ('success' o 'error').
   */
  const mostrarNotificacion = (texto, tipo) => {
    setNotificacion({ texto, tipo });
    setTimeout(() => setNotificacion(null), 3000); // Desaparece después de 3 segundos
  };

  /**
   * Maneja el depósito de dinero.
   * @param {number} monto - Cantidad a depositar.
   */
  const manejarDeposito = (monto) => {
    if (isNaN(monto) || monto <= 0) {
      mostrarNotificacion("Monto inválido. Por favor, ingresa un número positivo.", "error");
      return;
    }
    if (saldo + monto > 990) {
      mostrarNotificacion("No puedes exceder $990.", "error");
      return;
    }

    const nuevoSaldo = saldo + monto;
    setSaldo(nuevoSaldo);

    const movimiento = {
      tipo: "Depósito",
      monto,
      fecha: new Date().toLocaleString(),
    };

    agregarHistorial(movimiento);
    setUltimoMovimiento(movimiento);
    mostrarNotificacion(`Depósito exitoso: +$${monto}`, "success");
    setModal(null); // Cierra el modal
  };

  /**
   * Maneja el retiro de dinero.
   * @param {number} monto - Cantidad a retirar.
   */
  const manejarRetiro = (monto) => {
    if (isNaN(monto) || monto <= 0) {
      mostrarNotificacion("Monto inválido. Por favor, ingresa un número positivo.", "error");
      return;
    }
    if (saldo - monto < 10) {
      mostrarNotificacion("No puedes tener menos de $10.", "error");
      return;
    }

    const nuevoSaldo = saldo - monto;
    setSaldo(nuevoSaldo);

    const movimiento = {
      tipo: "Retiro",
      monto,
      fecha: new Date().toLocaleString(),
    };

    agregarHistorial(movimiento);
    setUltimoMovimiento(movimiento);
    mostrarNotificacion(`Retiro exitoso: -$${monto}`, "success");
    setModal(null); // Cierra el modal
  };

  /**
   * Agrega un movimiento al historial del usuario.
   * @param {Object} movimiento - Detalles de la transacción (tipo, monto, fecha).
   */
  const agregarHistorial = (movimiento) => {
    setHistorial([...historial, movimiento]);
  };

  /**
   * Genera un PDF que incluye el saldo actual y las últimas 10 transacciones.
   */
  const generarPDFSaldo = () => {
    const doc = new jsPDF();

    // Título del PDF
    doc.setFontSize(16);
    doc.text("Comprobante de Saldo y Transacciones", 20, 20);

    // Información general del usuario
    doc.setFontSize(12);
    doc.text(`Usuario: ${usuario.nombre}`, 20, 40);
    doc.text(`Saldo actual: $${saldo}`, 20, 50);
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 20, 60);

    // Título de transacciones
    doc.text("Últimas 10 transacciones:", 20, 80);

    // Listar las últimas 10 transacciones
    const transacciones = historial.slice(-10);
    let y = 100;

    transacciones.forEach((mov, index) => {
      doc.text(`${index + 1}. ${mov.tipo} - $${mov.monto} - ${mov.fecha}`, 20, y);
      y += 10;
    });

    doc.save("saldo-y-transacciones.pdf");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      {/* Contenedor principal */}
      <div className="max-w-md w-full bg-white rounded-lg p-6 shadow-xl text-gray-800">
        <h1 className="text-2xl font-bold text-center mb-6">👋 Hola, {usuario.nombre}</h1>

        {/* Sección de saldo */}
        <div className="relative bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-lg p-6 mb-6 shadow-md flex flex-col items-center">
          <p className="text-lg mb-2">Saldo actual:</p>
          <p className="text-5xl font-bold mb-2">{saldoVisible ? `$${saldo}` : "****"}</p>
          <button
            onClick={() => setSaldoVisible(!saldoVisible)}
            className="text-white text-2xl hover:text-blue-300 transition"
          >
            {saldoVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
          {saldoVisible && (
            <div className="flex space-x-4 mt-4">
              <button
                onClick={generarPDFSaldo}
                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg"
              >
                Descargar PDF
              </button>
              <button
                onClick={() => window.print()}
                className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded-lg"
              >
                Imprimir
              </button>
            </div>
          )}
        </div>

        {/* Botones principales */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setModal("deposito")}
            className="bg-green-600 hover:bg-green-500 text-white p-4 rounded-lg shadow-md text-lg font-bold"
          >
            Depositar
          </button>
          <button
            onClick={() => setModal("retiro")}
            className="bg-red-600 hover:bg-red-500 text-white p-4 rounded-lg shadow-md text-lg font-bold"
          >
            Retirar
          </button>
        </div>

        {/* Botón para salir */}
        <button
          onClick={() => setUsuarioActual(null)}
          className="bg-gray-600 hover:bg-gray-500 text-white w-full p-2 rounded-lg text-sm"
        >
          Salir
        </button>

        {/* Historial de transacciones */}
        <h2 className="text-xl font-bold mt-6 mb-4">📜 Historial de transacciones</h2>
        <ul className="space-y-3">
          {historial.map((mov, index) => (
            <li
              key={index}
              className="bg-gray-100 p-3 rounded-lg shadow-md flex justify-between items-center"
            >
              <span className="flex-1 text-left">{mov.tipo}</span>
              <span className="flex-1 text-right font-medium">{`$${mov.monto}`}</span>
              <span className="flex-1 text-right text-sm text-gray-400">{mov.fecha}</span>
            </li>
          ))}
        </ul>

        {/* Modal */}
        {modal === "deposito" && (
          <Modal titulo="Depositar dinero" onClose={() => setModal(null)}>
            <FormularioTransaccion
              onSubmit={(monto) => manejarDeposito(parseFloat(monto))}
            />
          </Modal>
        )}
        {modal === "retiro" && (
          <Modal titulo="Retirar dinero" onClose={() => setModal(null)}>
            <FormularioTransaccion
              onSubmit={(monto) => manejarRetiro(parseFloat(monto))}
            />
          </Modal>
        )}

        {/* Comprobante */}
        {ultimoMovimiento && (
          <Comprobante
            movimiento={ultimoMovimiento}
            onClose={() => setUltimoMovimiento(null)}
          />
        )}

        {/* Notificaciones */}
        {notificacion && (
          <div
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-white ${
              notificacion.tipo === "success"
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {notificacion.texto}
          </div>
        )}
      </div>
    </div>
  );
}

// Formulario para capturar el monto en depósitos/retiros
function FormularioTransaccion({ onSubmit }) {
  const [monto, setMonto] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();
    onSubmit(monto);
  };

  return (
    <form onSubmit={manejarEnvio} className="space-y-4">
      <input
        type="number"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        placeholder="Ingresa el monto"
        className="block w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 w-full p-3 rounded-lg text-white"
      >
        Confirmar
      </button>
    </form>
  );
}
