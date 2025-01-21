/**
 * Componente Modal:
 * Este componente crea un modal reutilizable que puede recibir contenido dinámico (children).
 * También incluye un botón para cerrarlo.
 *
 * Props:
 * - titulo (string): Título del modal.
 * - children (ReactNode): Contenido dinámico que se mostrará dentro del modal.
 * - onClose (function): Función que se ejecuta al cerrar el modal.
 */
export default function Modal({ titulo, children, onClose }) {
    return (
      /**
       * Capa de fondo: Ocupa toda la pantalla y oscurece el fondo.
       * - `fixed`: Posición fija para cubrir toda la pantalla.
       * - `inset-0`: Establece márgenes en 0 para cubrir el viewport.
       * - `bg-black bg-opacity-50`: Fondo negro con opacidad al 50%.
       * - `flex justify-center items-center`: Alinea el modal en el centro de la pantalla.
       */
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        {/**
         * Contenedor principal del modal:
         * - `bg-white`: Fondo blanco.
         * - `p-6`: Espaciado interno de 1.5rem.
         * - `rounded-lg`: Bordes redondeados.
         * - `shadow-lg`: Sombra para dar efecto de elevación.
         * - `max-w-sm w-full`: Define un ancho máximo pequeño y adapta el tamaño al contenedor.
         * - `relative`: Permite posicionar elementos hijos, como el botón de cierre.
         */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
          {/**
           * Botón de cierre:
           * - `absolute`: Posiciona el botón en la esquina superior derecha del modal.
           * - `top-2 right-2`: Define la posición respecto a la esquina.
           * - `text-gray-400 hover:text-gray-600`: Cambia el color del ícono al pasar el cursor.
           * - `&times;`: Símbolo de "cerrar" (X).
           */}
          <button
            onClick={onClose} // Ejecuta la función para cerrar el modal.
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
  
          {/**
           * Título del modal:
           * - `text-xl`: Texto grande (1.25rem).
           * - `font-bold`: Texto en negritas.
           * - `mb-4`: Espaciado inferior de 1rem.
           */}
          <h2 className="text-xl font-bold mb-4">{titulo}</h2>
  
          {/**
           * Contenido dinámico (children):
           * Permite que el modal muestre contenido personalizado pasado como prop.
           */}
          {children}
        </div>
      </div>
    );
  }
  