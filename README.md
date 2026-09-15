# Forge AI Labs

PROYECTO: AIForge — Plataforma de IA, herramientas y productividad

Quiero que construyas una aplicación web profesional llamada AIForge, una plataforma especializada en inteligencia artificial, herramientas digitales, productividad, programación y automatización.

La web debe tener dos objetivos simultáneos:

Ser un proyecto técnico suficientemente avanzado para utilizarlo como Trabajo Fin de Máster de Inteligencia Artificial.

Estar diseñada desde el principio con una arquitectura SEO y UX preparada para crecer orgánicamente y monetizarse posteriormente mediante Google AdSense, sin sacrificar la experiencia del usuario.

IMPORTANTE: no quiero una web que parezca un blog generado automáticamente por IA. Quiero que parezca un producto tecnológico real creado por una empresa especializada en IA.

1. CONCEPTO DEL PRODUCTO

Nombre:

AIForge

Claim:

“Descubre, compara y utiliza la inteligencia artificial.”

Descripción:

AIForge será una plataforma que combina:

herramientas de inteligencia artificial;

herramientas para programadores;

comparativas de modelos y aplicaciones de IA;

tutoriales;

guías prácticas;

noticias y novedades cuidadosamente seleccionadas;

recursos educativos;

calculadoras y utilidades;

directorio de herramientas de IA.

La plataforma debe priorizar siempre la utilidad para el usuario.

2. PÚBLICO OBJETIVO

Principalmente:

estudiantes;

programadores;

desarrolladores web;

estudiantes de IA;

profesionales tecnológicos;

emprendedores;

creadores de contenido;

pequeñas empresas;

personas que quieren aprender a utilizar IA.

Edad aproximada:

18-45 años.

Mercado inicial:

España y países hispanohablantes.

La arquitectura debe quedar preparada para internacionalización futura a inglés.

3. OBJETIVO SEO

Diseña la arquitectura siguiendo buenas prácticas actuales de Google Search.

NO crear páginas masivas automáticamente únicamente para posicionar.

El contenido debe ser útil, original, estructurado y aportar valor real.

La arquitectura debe facilitar:

rastreo;

indexación;

enlazado interno;

Core Web Vitals;

URLs limpias;

datos estructurados;

sitemap;

robots.txt;

canonical URLs;

Open Graph;

Twitter/X cards;

metadatos SEO;

breadcrumbs;

páginas de autor;

categorías;

etiquetas controladas;

páginas de herramientas;

comparativas;

artículos.

Implementa:

sitemap.xml

robots.txt

canonical

meta title

meta description

Open Graph

Schema.org JSON-LD cuando corresponda

BreadcrumbList

Article

SoftwareApplication para herramientas

FAQPage únicamente cuando sea apropiado y cumpla las directrices actuales

WebSite

Organization

No utilizar técnicas de keyword stuffing.

No crear contenido duplicado.

No crear cientos de páginas artificiales.

4. ESTRUCTURA PRINCIPAL

Crear las siguientes secciones:

/

/herramientas

/herramientas/ia

/herramientas/programacion

/herramientas/productividad

/comparativas

/guias

/tutoriales

/blog

/recursos

/directorio-ia

/precios

/nosotros

/contacto

/politica-privacidad

/politica-cookies

/terminos

/aviso-legal

5. HOMEPAGE

Crear una homepage moderna, premium y tecnológica.

Hero:

“Descubre todo lo que puedes hacer con IA”

Subtítulo:

“Explora herramientas, aprende nuevas técnicas y encuentra la IA adecuada para cada tarea.”

CTA principal:

“Explorar herramientas”

CTA secundario:

“Ver comparativas”

Debajo del hero:

buscador global;

herramientas populares;

herramientas nuevas;

comparativas destacadas;

artículos destacados;

categorías;

herramientas gratuitas;

sección de recursos.

La homepage debe transmitir inmediatamente que AIForge es una plataforma útil, no simplemente un blog.

6. DIRECTORIO DE HERRAMIENTAS IA

Crear un directorio de herramientas.

Cada herramienta debe tener:

nombre;

logo;

descripción;

categoría;

precio;

versión gratuita;

puntuación;

características;

enlace oficial;

alternativas;

pros;

contras;

casos de uso;

fecha de última revisión.

Categorías iniciales:

Chatbots

Generación de imágenes

Generación de vídeo

Audio

Música

Programación

Marketing

Productividad

Educación

Automatización

Diseño

Investigación

Presentaciones

Escritura

Análisis de datos

Crear filtros:

gratuita;

freemium;

de pago;

código;

imágenes;

vídeo;

texto;

audio;

empresas;

estudiantes.

7. SISTEMA DE COMPARATIVAS

Crear una sección de comparativas.

Ejemplos iniciales:

ChatGPT vs Claude

ChatGPT vs Gemini

Claude vs Gemini

Cursor vs GitHub Copilot

Lovable vs Bolt

Midjourney vs Flux

ElevenLabs vs otras herramientas de voz

Cada comparativa debe contener:

resumen;

tabla comparativa;

precio;

características;

facilidad de uso;

rendimiento;

casos de uso;

ventajas;

desventajas;

conclusión;

recomendación según perfil.

Crear un componente reutilizable ComparisonTable.

8. HERRAMIENTAS INTERACTIVAS

Esta es una de las partes más importantes del proyecto.

Crear herramientas reales, no simples botones falsos.

Primera versión:

Prompt Optimizer

El usuario introduce un prompt.

La aplicación devuelve una versión mejorada siguiendo una estructura:

objetivo;

contexto;

rol;

restricciones;

formato;

ejemplos;

criterios de calidad.

Mostrar antes/después.

AI Cost Calculator

Calculadora para estimar costes aproximados de APIs de modelos de IA.

Inputs:

modelo;

tokens de entrada;

tokens de salida;

número de peticiones;

frecuencia diaria;

frecuencia mensual.

Mostrar:

coste diario;

coste mensual;

coste anual.

La arquitectura debe permitir actualizar los precios desde una fuente de datos sin tener que modificar manualmente todos los componentes.

Token Calculator

Permitir introducir texto y estimar:

caracteres;

palabras;

tokens aproximados;

coste estimado.

JSON Formatter

Herramienta para:

formatear JSON;

validar JSON;

minimizar JSON;

mostrar errores.

Regex Tester

Editor para:

expresión regular;

texto de prueba;

coincidencias;

grupos.

Text Analyzer

Analizar:

palabras;

caracteres;

frases;

tiempo estimado de lectura;

densidad de palabras.

9. IA

Diseñar una arquitectura preparada para integrar APIs de IA.

Crear una capa de abstracción:

AIProvider

que permita posteriormente conectar:

OpenAI;

Anthropic;

Google Gemini;

otros proveedores.

No colocar API keys en el frontend.

Toda llamada sensible debe realizarse desde backend/server functions.

Utilizar variables de entorno.

Crear estados:

loading;

success;

error;

rate limit.

Añadir protección básica contra abuso.

10. BLOG

Crear un CMS/estructura de contenidos preparada para artículos.

Cada artículo debe contener:

título;

slug;

autor;

fecha de publicación;

fecha de actualización;

categoría;

tags;

imagen destacada;

introducción;

tabla de contenidos;

contenido;

artículos relacionados;

herramientas relacionadas;

fuentes;

autor.

Mostrar claramente:

“Actualizado el…”

Esto es importante para contenidos tecnológicos que cambian rápidamente.

11. ESTRATEGIA DE CONTENIDO

No quiero artículos genéricos generados automáticamente.

Crear categorías de contenido:

IA para programadores

Ejemplos:

“Cómo utilizar IA para programar”

“Mejores asistentes de programación con IA”

“Cursor vs GitHub Copilot”

“Cómo utilizar IA para documentar código”

“Cómo crear tests con IA”

IA para estudiantes

“Mejores herramientas de IA para estudiar”

“Cómo utilizar IA para resumir apuntes”

“Cómo crear un plan de estudio con IA”

IA para empresas

“Cómo automatizar tareas con IA”

“Qué es un agente de IA”

“Cómo implementar RAG”

“Qué es MCP”

Herramientas IA

“Mejores herramientas de IA para…”

“Alternativas a…”

“X vs Y”

Estas páginas deben estar basadas en investigación, pruebas y experiencia real.

12. SEO PROGRAMÁTICO CONTROLADO

Crear una arquitectura que permita generar páginas dinámicas únicamente cuando exista información real y útil.

Ejemplo:

/herramientas/chatgpt

/herramientas/claude

/herramientas/gemini

/comparativas/chatgpt-vs-claude

/comparativas/chatgpt-vs-gemini

No generar automáticamente miles de páginas.

Todas las páginas indexables deben tener contenido sustancial y diferente.

13. BUSCADOR

Crear un buscador global.

El usuario puede buscar:

herramientas;

artículos;

comparativas;

tutoriales;

recursos.

Mostrar resultados agrupados por tipo.

Añadir:

búsqueda instantánea;

filtros;

orden por relevancia.

14. SISTEMA DE RECOMENDACIÓN

Crear una pequeña funcionalidad de recomendación.

Pregunta al usuario:

“¿Qué quieres hacer?”

Opciones:

programar;

estudiar;

generar imágenes;

generar vídeo;

crear contenido;

automatizar;

analizar documentos;

crear una web;

crear una presentación.

Después:

“¿Cuál es tu presupuesto?”

Gratis

Menos de 10 €

10-30 €

Más de 30 €

Después:

“¿Cuál es tu nivel?”

Principiante

Intermedio

Avanzado

Finalmente recomendar herramientas.

Mostrar explicación de por qué se recomienda cada herramienta.

15. MONETIZACIÓN

Preparar la arquitectura para Google AdSense.

IMPORTANTE:

No llenar la interfaz de anuncios.

Los anuncios deben aparecer únicamente en posiciones naturales y respetando las políticas de Google.

Crear componentes:

AdSlot

con posiciones:

top-content;

in-content;

sidebar;

bottom-content.

El sistema debe permitir activar/desactivar anuncios mediante configuración.

Durante desarrollo:

mostrar placeholders discretos como:

“Espacio publicitario”

Nunca hacer clics automáticos.

Nunca incentivar al usuario a hacer clic en anuncios.

Nunca crear contenido únicamente para generar impresiones publicitarias.

16. PRIVACIDAD Y GDPR

Como el proyecto estará dirigido inicialmente a usuarios europeos, preparar:

Política de privacidad;

Política de cookies;

Aviso legal;

Gestión de consentimiento;

términos de uso.

Crear arquitectura compatible con Consent Management Platform.

No cargar determinados scripts de publicidad/analítica antes del consentimiento cuando sea necesario.

17. PÁGINA DE AUTOR

Crear una página:

/autor

Mostrar:

nombre;

descripción;

experiencia;

artículos publicados;

herramientas creadas;

fecha de actualización.

El objetivo es aumentar la transparencia y confianza del proyecto.

18. DISEÑO

Estética:

premium SaaS + inteligencia artificial.

Inspiración conceptual:

Linear

Vercel

Stripe

Notion

Perplexity

Pero NO copiar diseños.

Usar:

mucho espacio;

tipografía moderna;

tarjetas limpias;

iconografía sencilla;

microanimaciones;

gradientes muy sutiles;

modo oscuro y claro.

Debe parecer una startup tecnológica real.

19. RESPONSIVE

Mobile-first.

Debe funcionar perfectamente en:

móvil;

tablet;

portátil;

monitor grande.

Priorizar Core Web Vitals.

Evitar:

imágenes enormes;

JavaScript innecesario;

animaciones pesadas;

fuentes excesivas;

elementos que bloqueen el renderizado.

20. ACCESIBILIDAD

Cumplir buenas prácticas WCAG.

Implementar:

navegación por teclado;

labels;

contraste;

aria cuando corresponda;

focus states;

textos alternativos;

botones accesibles.

21. TECNOLOGÍA

Utilizar una arquitectura moderna y mantenible.

Preferencias:

React;

TypeScript;

Tailwind CSS;

componentes reutilizables;

backend/server functions;

base de datos PostgreSQL/Supabase si es necesario.

Separar:

components

pages

services

lib

hooks

types

data

utils

api

22. BASE DE DATOS

Diseñar tablas para:

users

tools

tool_categories

tool_features

comparisons

articles

categories

authors

reviews

favorites

searches

subscriptions

analytics_events

Crear relaciones correctamente.

No almacenar API keys en la base de datos.

23. PANEL ADMINISTRATIVO

Crear un dashboard privado para administrar:

herramientas;

artículos;

categorías;

comparativas;

usuarios;

estadísticas;

herramientas destacadas.

Dashboard con:

visitas;

páginas más vistas;

búsquedas;

herramientas más consultadas;

comparativas más visitadas;

CTR interno;

conversiones.

No mostrar datos personales innecesarios.

24. ANALÍTICA

Preparar integración con:

Google Analytics 4

Google Search Console

Google AdSense

Crear eventos:

tool_view

tool_click

comparison_view

article_view

search

prompt_optimizer_used

calculator_used

recommendation_completed

external_tool_click

No implementar seguimiento invasivo.

25. ESTRUCTURA DE URLs

Utilizar URLs cortas y descriptivas.

Ejemplos:

/herramientas/chatgpt

/herramientas/claude

/comparativas/chatgpt-vs-claude

/guias/que-es-rag

/tutoriales/crear-agente-ia

/blog/mejores-ia-programar

No utilizar:

/page?id=123

/blog/post-928372

26. INTERNAL LINKING

Implementar enlaces internos automáticos y manuales.

Por ejemplo:

Un artículo sobre RAG puede enlazar a:

herramientas relacionadas;

otros artículos;

comparativas;

tutoriales.

Cada página importante debe ser accesible desde otras páginas relevantes.

Crear componente:

RelatedContent.

27. FUENTES Y CREDIBILIDAD

En artículos técnicos permitir añadir:

documentación oficial;

papers;

GitHub;

documentación de APIs;

fuentes utilizadas.

No inventar fuentes.

No inventar estadísticas.

Cuando se comparen herramientas, separar claramente:

“Datos proporcionados por el fabricante”

de

“Pruebas realizadas por AIForge”.

28. MODELO DE MONETIZACIÓN FUTURO

Diseñar la plataforma para combinar posteriormente:

Google AdSense

afiliación de herramientas SaaS

enlaces patrocinados claramente identificados

newsletter

herramientas premium

API premium

planes para empresas

No implementar publicidad agresiva.

La prioridad es construir audiencia y confianza.

29. SEO PARA IA / SEARCH GENERATIVO

Preparar contenido para que sea fácilmente entendible por sistemas de búsqueda modernos.

Utilizar:

respuestas directas;

definiciones claras;

tablas;

comparaciones;

listas;

ejemplos;

datos estructurados;

fuentes;

contenido original;

imágenes relevantes;

contenido visual cuando aporte valor.

No intentar manipular sistemas de IA generativa.

El objetivo debe ser que AIForge sea una fuente útil y citable.

30. PÁGINAS LEGALES

Crear las páginas:

/politica-privacidad

/politica-cookies

/terminos

/aviso-legal

/contacto

/nosotros

Las páginas deben estar enlazadas desde el footer.

31. FOOTER

Footer profesional con:

AIForge

Producto:

Herramientas

Comparativas

Directorio

Recursos

Contenido:

Blog

Guías

Tutoriales

Empresa:

Nosotros

Contacto

Legal:

Privacidad

Cookies

Términos

Aviso legal

Redes sociales.

Newsletter.

32. NEWSLETTER

Crear una sección:

“Una vez por semana, las mejores herramientas de IA.”

Campo:

Email

CTA:

“Suscribirme”

No enviar emails automáticamente durante el desarrollo.

Preparar integración futura con un proveedor de email.

33. NEWSLETTER / LEAD MAGNET

Crear un recurso descargable:

“Guía práctica de IA para estudiantes y programadores”

El objetivo es conseguir suscriptores.

34. HOME SEO

Title:

AIForge | Herramientas, comparativas y recursos de Inteligencia Artificial

Meta description:

“Descubre herramientas de IA, comparativas, tutoriales y recursos para estudiar, programar, crear contenido y automatizar tareas.”

35. RENDIMIENTO

Prioridad absoluta:

Performance.

Objetivos:

LCP < 2.5s

INP < 200ms

CLS < 0.1

Optimizar:

imágenes;

lazy loading;

bundles;

fuentes;

CSS;

JavaScript;

caching.

36. SEGURIDAD

Implementar:

validación de inputs;

sanitización;

rate limiting;

protección de endpoints;

variables de entorno;

no exponer claves;

protección básica contra abuso de APIs.

37. IMPORTANTE SOBRE IA GENERATIVA

La aplicación puede utilizar IA para ayudar a crear o transformar contenido, pero nunca debe generar automáticamente cientos o miles de páginas únicamente con intención SEO.

La arquitectura debe favorecer:

IA + revisión humana + experiencia real + fuentes + pruebas + valor añadido.

38. DIFERENCIACIÓN

AIForge NO debe ser otro blog de noticias de IA.

Su ventaja competitiva debe ser:

“No solo te contamos qué IA existe. Te ayudamos a encontrar cuál necesitas y te damos herramientas para utilizarla.”

El producto debe combinar:

CONTENIDO + HERRAMIENTAS + COMPARATIVAS + RECOMENDACIONES.

39. MVP

Construye primero una versión funcional con:

Homepage

Directorio

Con al menos 20 herramientas ficticias/demostrativas estructuradas correctamente para poder sustituirlas después por datos reales.

Comparativas

Al menos 5.

Blog

Al menos 10 artículos de demostración.

Herramientas

Prompt Optimizer

Token Calculator

JSON Formatter

Regex Tester

Text Analyzer

AI Cost Calculator

Buscador

Sistema de recomendaciones

Panel administrativo básico

SEO técnico

páginas legales

responsive

modo oscuro

40. IMPORTANTE: DATOS DEMO

No inventes datos que parezcan reales sobre precios, rendimiento o características actuales de herramientas.

Cuando utilices información de demostración, etiquetarla como:

“Demo”

o

“Datos de ejemplo”.

Preparar el modelo de datos para sustituir posteriormente los datos demo por información real.

41. CALIDAD DEL CÓDIGO

Quiero código:

limpio;

modular;

tipado;

mantenible;

reutilizable;

comentado únicamente cuando sea necesario.

No crear componentes gigantes.

Evitar duplicación.

Crear componentes reutilizables.

42. RESULTADO FINAL

Quiero que el resultado parezca una plataforma SaaS/startup tecnológica profesional, no una plantilla de blog.

La experiencia principal debe ser:

ENTRAR → BUSCAR UNA NECESIDAD → ENCONTRAR HERRAMIENTAS → COMPARAR → PROBAR UNA HERRAMIENTA → LEER UNA GUÍA → VOLVER.

La monetización debe ser secundaria a la utilidad.

La web debe estar preparada para crecer orgánicamente mediante:

SEO;

contenido original;

herramientas;

comparativas;

enlaces internos;

newsletter;

tráfico recurrente.

Y debe estar técnicamente preparada para integrar Google AdSense posteriormente respetando todas las políticas aplicables.

Antes de terminar, revisa toda la aplicación y comprueba:

responsive;

navegación;

enlaces;

SEO;

accesibilidad;

rendimiento;

errores de consola;

estados de carga;

estados de error;

formularios;

rutas;

componentes;

seguridad.

No quiero una demo visual estática. Quiero una base funcional y escalable de un producto real.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://forge-ai-hub-09.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c810228d-2b03-45fc-8e11-59978ef4d7b5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
