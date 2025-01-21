import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

// Lista de cuentas disponibles en el sistema
// Cada cuenta contiene:
// - nombre: Nombre del usuario.
// - saldo: Saldo inicial de la cuenta.
// - password: Contraseña asociada a la cuenta.
// - historial: Arreglo vacío para registrar las transacciones.
const cuentas = [
  { nombre: "Mali", saldo: 200, password: "1234", historial: [] },
  { nombre: "Gera", saldo: 290, password: "5678", historial: [] },
  { nombre: "Maui", saldo: 67, password: "abcd", historial: [] },
];

// Componente principal de la aplicación
function App() {
  // Estado para almacenar al usuario actualmente logueado.
  // Si es `null`, significa que no hay un usuario activo.
  const [usuarioActual, setUsuarioActual] = useState(null);

  return (
    <>
      {/* Si no hay un usuario logueado, muestra el componente Login */}
      {!usuarioActual ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
          {/* El componente Login recibe:
              - cuentas: Lista de cuentas disponibles para seleccionar.
              - setUsuarioActual: Función para actualizar el usuario logueado. */}
          <Login cuentas={cuentas} setUsuarioActual={setUsuarioActual} />
        </div>
      ) : (
        /* Si hay un usuario logueado, muestra el componente Dashboard */
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
          {/* El componente Dashboard recibe:
              - usuario: Los datos de la cuenta logueada.
              - setUsuarioActual: Función para cerrar sesión y regresar al Login. */}
          <Dashboard usuario={usuarioActual} setUsuarioActual={setUsuarioActual} />
        </div>
      )}
    </>
  );
}

export default App;
