# AIForge V3 — Prioridad 1

- [x] 1. Fichas de herramientas completas (nivel, API, público, fuentes, acceso oficial)
- [x] 2. Sin valoraciones ficticias → AIForge Score editorial /10 con página de metodología
- [x] 3. Buscador global agrupado + filtros (tipo, categoría, precio)
- [x] 4. La Forja: mejor opción + % de compatibilidad + alternativas, siempre con resultado
- [x] 5. Seis utilidades (Prompt Optimizer, Tokens, Costes, JSON, Regex, SQL)
- [x] 6. Comparativas con resumen rápido (score, precio, plan gratis, nivel) y perfiles
- [x] 7. SEO técnico (titles/descriptions/canonical/OG únicos, sitemap con /metodologia)
- [x] 8. Responsive (contenedores con overflow controlado en las nuevas utilidades)
- [x] 9. Rendimiento (sin dependencias nuevas; todo se calcula en el navegador)
- [x] 10. Enlazado interno (ficha ↔ alternativas ↔ comparativas ↔ metodología)
- [x] Verificación: tipos OK, 21 tests OK, rutas clave responden 200

Pendiente (fuera de Prioridad 1): newsletter, prioridades 2 y 3 del documento V3.

# Robustez para el TFM
- [x] Insertar el artículo enviado en posts y comprobar su lectura en el blog y sitemap: contenido íntegro, tabla adaptable, metadatos correctos y 35 pruebas superadas.
- [x] Servicio asíncrono del catálogo e integración con la interfaz.
- [x] Prompt Optimizer con IA real y clave exclusivamente en servidor.
- [x] Errores controlados, cancelación y notificaciones.
- [x] Tests y comprobación del flujo real: 33 tests; respuesta real del optimizador; errores 401/429/503 conservan el texto; rutas principales HTTP 200.
