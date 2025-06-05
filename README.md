# 🌍 Itinerario de Viajes - Travel Planner

Una aplicación web moderna para planificar viajes personalizados, construida con React y Bootstrap.

## ✨ Características Implementadas

### 📋 Formulario Completo de Planificación
- **Destino**: Campo inteligente con validación de longitud
- **Fechas**: Selector de fechas con validación de rangos
- **Duración**: Cálculo automático basado en fechas seleccionadas
- **Tipo de Viaje**: 7 categorías diferentes (Aventura, Cultural, Relajación, etc.)
- **Presupuesto**: Campo numérico con límites establecidos
- **Número de Viajeros**: Validación de 1-20 personas

### 🛡️ Validación Robusta
- Validación en tiempo real mientras el usuario escribe
- Mensajes de error descriptivos y en español
- Prevención de fechas pasadas
- Límites de presupuesto y duración
- Indicadores visuales de estado del formulario

### 🎨 UX/UI Mejorada
- Diseño responsivo con Bootstrap 5
- Iconos intuitivos para cada campo
- Indicador de progreso del formulario
- Estados de carga con spinner
- Alertas de éxito y error
- Contador de caracteres
- Botones inteligentes (se habilitan/deshabilitan según contexto)

### 🏗️ Arquitectura Escalable
- **Hook personalizado** (`useTravelForm`) para lógica de negocio
- **Separación de responsabilidades** (UI vs Lógica)
- **Constantes centralizadas** para mantenimiento fácil
- **Código limpio y documentado** con JSDoc
- **Componentes modulares** y reutilizables

## 🚀 Tecnologías Utilizadas

- **React 19.1.0** - Framework de JavaScript
- **React Bootstrap 2.10.10** - Componentes de UI
- **Bootstrap 5.3.6** - Sistema de diseño
- **JavaScript ES6+** - Sintaxis moderna
- **React Hooks** - Manejo de estado y efectos

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   └── TravelForm.js   # Formulario principal
├── hooks/              # Hooks personalizados
│   └── useTravelForm.js # Lógica del formulario
├── utils/              # Utilidades y constantes
│   └── constants.js    # Constantes de la aplicación
├── App.js              # Componente principal
└── index.js            # Punto de entrada
```

## 🎯 Próximas Funcionalidades (Roadmap)

### Día 2: Sistema de Itinerarios
- [ ] Componente para mostrar itinerarios generados
- [ ] Algoritmo básico de generación de actividades
- [ ] Almacenamiento local de itinerarios

### Día 3: Gestión de Datos
- [ ] Persistencia en LocalStorage
- [ ] Historial de viajes planificados
- [ ] Funcionalidad de editar/eliminar

### Día 4: Mejoras UX
- [ ] Sistema de navegación (React Router)
- [ ] Página de detalles de itinerario
- [ ] Funcionalidad de compartir

### Día 5: Integración Externa
- [ ] API de lugares turísticos
- [ ] Mapas interactivos
- [ ] Información del clima

## 🛠️ Instalación y Uso

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd itinerario-viajes
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Scripts Disponibles

- `npm start` - Ejecuta la aplicación en modo desarrollo
- `npm test` - Ejecuta las pruebas unitarias
- `npm run build` - Construye la aplicación para producción
- `npm run eject` - Expone configuración de webpack

## 📝 Mejores Prácticas Implementadas

### 🧹 Código Limpio
- **Nombres descriptivos** para variables y funciones
- **Comentarios JSDoc** en todas las funciones
- **Separación de concerns** (lógica vs presentación)
- **Constantes centralizadas** para evitar magic numbers

### 🔧 Arquitectura
- **Custom Hooks** para reutilización de lógica
- **Componentes funcionales** con hooks de React
- **Props drilling evitado** mediante hooks personalizados
- **Estado inmutable** con spread operator

### 🎯 UX/UI
- **Diseño mobile-first** con Bootstrap
- **Retroalimentación inmediata** al usuario
- **Estados de carga** para operaciones asíncronas
- **Accesibilidad** con labels y ARIA attributes

### 🛡️ Validación
- **Validación del lado cliente** en tiempo real
- **Sanitización de inputs** para seguridad
- **Mensajes de error claros** y accionables
- **Prevención de estados inválidos**

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la Branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 👨‍💻 Desarrollado por

**Sandro Gomez** - Desarrollador Full Stack

---

*Desarrollado con ❤️ usando React y las mejores prácticas de desarrollo web*
