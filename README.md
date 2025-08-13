# Pineapple - Sistema de Gestión de Productos

## 📋 Descripción
Pineapple es una aplicación web moderna desarrollada con React y TypeScript que permite gestionar un inventario de productos de manera eficiente. La aplicación ofrece una interfaz de usuario intuitiva y responsive con características como autenticación de usuarios, gestión de productos y un dashboard informativo.

## 🚀 Características Principales
- **Autenticación Segura**
  - Sistema de login con JWT
  - Protección de rutas
  - Manejo de sesiones

- **Gestión de Productos**
  - Listado de productos con diseño de cards
  - Creación de nuevos productos
  - Edición de productos existentes
  - Eliminación de productos con confirmación
  - Visualización de imágenes de productos
  - Gestión de stock y precios

- **Dashboard Interactivo**
  - Resumen de estadísticas
  - Acceso rápido a funciones principales
  - Interfaz moderna y responsive

- **Interfaz de Usuario**
  - Diseño moderno con Tailwind CSS
  - Animaciones y transiciones suaves
  - Navegación intuitiva
  - Feedback visual en todas las acciones
  - Diseño responsive para todos los dispositivos

## 🛠️ Tecnologías Utilizadas
- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - React Router DOM
  - Axios
  - HeadlessUI/Heroicons
  - SweetAlert2

- **Herramientas de Desarrollo**
  - Vite
  - ESLint
  - Prettier

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd UI_pineaple
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   VITE_API_URL=https://api-pineapple.onrender.com/api
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

## 🚀 Despliegue
Para construir la aplicación para producción:
```bash
npm run build
```

Los archivos de la build se generarán en el directorio `dist/`.

## 🔒 Variables de Entorno Requeridas
- `VITE_API_URL`: URL base de la API del backend

## 📁 Estructura del Proyecto
```
UI_pineaple/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/         # Componentes de página
│   ├── services/      # Servicios (API, auth, etc.)
│   ├── types/         # Definiciones de tipos TypeScript
│   ├── App.tsx        # Componente principal
│   └── main.tsx       # Punto de entrada
├── public/            # Archivos estáticos
└── package.json       # Dependencias y scripts
```

## 🔑 Características de Seguridad
- Protección de rutas con autenticación
- Manejo seguro de tokens JWT
- Interceptores de Axios para manejo de errores
- Validación de formularios
- Manejo de errores consistente

## 💻 Guía de Desarrollo

### Comandos Disponibles
- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la build de producción
- `npm run lint`: Ejecuta el linter
- `npm run format`: Formatea el código con Prettier

### Convenciones de Código
- Usar TypeScript para todo el código
- Seguir el estilo de código de Prettier
- Componentes funcionales con hooks
- Props tipadas con interfaces
- Nombres descriptivos para variables y funciones

## 🤝 Contribución
1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: alguna característica amazing'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 👥 Autores
- Miguel Angel

## 📞 Soporte
Para soporte, email pineapple@example.com o crear un issue en el repositorio.
