# Cajero Automático 💳

¡Bienvenido al proyecto **Cajero Automático**! 🏦  
Esta aplicación simula la interacción con un cajero automático, permitiendo a los usuarios realizar consultas, depósitos, y retiros de manera sencilla y visualmente atractiva.

## 🚀 Funcionalidades

- **Inicio de sesión seguro**:
  - Los usuarios seleccionan su cuenta y verifican su contraseña.
- **Consultas de saldo**:
  - Permite consultar el saldo actual de la cuenta.
  - Opción para descargar el saldo y las últimas 10 transacciones en formato PDF.
- **Depósitos y retiros**:
  - Los usuarios pueden ingresar o retirar dinero.
  - Validaciones:
    - No exceder $990.
    - No permitir un saldo inferior a $10.
- **Historial de transacciones**:
  - Cada movimiento (depósito, retiro, consulta) se registra en un historial detallado.

## 🌐 Demo en vivo

Puedes probar la aplicación en el siguiente enlace:  
🔗 [Cajero Automático en Vercel](https://cajero-atm-lake.vercel.app/)

## 🖥️ Tecnologías utilizadas

- **Frontend**:
  - React (con Vite para configuración y desarrollo rápido).
  - TailwindCSS para diseño moderno y responsivo.
- **Herramientas adicionales**:
  - `jsPDF`: Para generar comprobantes en formato PDF.

## 📂 Estructura del proyecto

```plaintext
.
├── src/
│   ├── components/
│   │   ├── Login.jsx        # Componente para el inicio de sesión
│   │   ├── Dashboard.jsx    # Componente principal con las funcionalidades del cajero
│   │   ├── Modal.jsx        # Componente modal reutilizable
│   │   ├── Comprobante.jsx  # Componente para mostrar comprobantes
│   ├── App.jsx              # Punto de entrada principal
│   ├── main.jsx             # Renderizado del árbol de componentes
├── public/
│   ├── index.html           # Archivo HTML principal
├── package.json             # Dependencias y scripts
├── tailwind.config.js       # Configuración de TailwindCSS
└── .gitignore               # Archivos y carpetas ignorados por Git
🛠️ Configuración y ejecución
Sigue estos pasos para ejecutar el proyecto en tu entorno local:

Clona este repositorio:

git clone https://github.com/TU-USUARIO/cajero-automatico.git
cd cajero-automatico
Instala las dependencias:

npm install
Inicia el servidor de desarrollo:

npm run dev
Abre el navegador en http://localhost:5173.

🌟 Mejora continua
Ideas para futuras mejoras:

Agregar transferencias entre cuentas.
Implementar gráficos para mostrar estadísticas de gastos.
Incorporar autenticación con más seguridad (p. ej., OTP, autenticación de dos factores).
