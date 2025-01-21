import { useState } from "react";

// Componente Login: Maneja la autenticación del usuario antes de ingresar al cajero
export default function Login({ cuentas, setUsuarioActual }) {
  // Estado para almacenar el índice de la cuenta seleccionada
  const [indiceCuenta, setIndiceCuenta] = useState("");
  // Estado para almacenar la contraseña ingresada por el usuario
  const [password, setPassword] = useState("");
  // Estado para mostrar mensajes de error en caso de credenciales incorrectas
  const [mensajeError, setMensajeError] = useState("");

  /**
   * Función para manejar el inicio de sesión.
   * Valida si las credenciales ingresadas coinciden con las de la cuenta seleccionada.
   */
  const manejarLogin = () => {
    const cuenta = cuentas[indiceCuenta]; // Busca la cuenta seleccionada en el arreglo
    if (!cuenta) {
      // Validación: Verifica si se seleccionó una cuenta válida
      setMensajeError("Selecciona una cuenta válida.");
      return;
    }
    if (cuenta.password === password) {
      // Si la contraseña es correcta, establece al usuario actual
      setUsuarioActual(cuenta);
    } else {
      // Si la contraseña es incorrecta, muestra un mensaje de error
      setMensajeError("Contraseña incorrecta. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Contenedor principal del formulario */}
      <div className="max-w-sm w-full bg-white rounded-lg p-6 shadow-xl text-gray-800">
        <h1 className="text-2xl font-bold text-center mb-6">🏦 Cajero Automático</h1>

        {/* Dropdown para seleccionar una cuenta */}
        <select
          value={indiceCuenta}
          onChange={(e) => setIndiceCuenta(e.target.value)}
          className="block w-full p-3 mb-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          {/* Opción por defecto: Solicita al usuario seleccionar una cuenta */}
          <option value="">Selecciona una cuenta</option>
          {/* Mapea las cuentas disponibles y las muestra como opciones */}
          {cuentas.map((cuenta, index) => (
            <option key={index} value={index}>
              {cuenta.nombre}
            </option>
          ))}
        </select>

        {/* Campo de entrada para la contraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-3 mb-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        {/* Mensaje de error: Se muestra si ocurre un problema durante el inicio de sesión */}
        {mensajeError && (
          <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
            {mensajeError}
          </p>
        )}

        {/* Botón para iniciar sesión */}
        <button
          onClick={manejarLogin}
          className="bg-blue-900 hover:bg-blue-800 w-full p-3 rounded-lg font-bold text-white transition-transform transform hover:scale-105"
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}
