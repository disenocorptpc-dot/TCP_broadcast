# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Personal corporativo y directores:** Audiencia visual en pasillos, salas y áreas de descanso de oficinas centrales que consultan de un vistazo el estatus de proyectos, cumpleaños, clima y anuncios.
- **Equipo de Operaciones (Pulse Ops):** Monitoriza la carga y resolución de tareas críticas sin necesidad de abrir Jira o un cliente web.
- **Visitantes y Clientes:** Perciben la modernidad, sofisticación y profesionalismo de The Palace Company en las instalaciones ejecutivas.

## Product Purpose

Proveer un centro de comando y transmisión visual en tiempo real (Broadcast Command Center) para las pantallas de gran formato de The Palace Company. Combina la estética hotelera de gran lujo con observabilidad operativa continua, mostrando métricas de Pulse, estado de la Sala de Juntas en el cintillo inferior, husos horarios internacionales y diapositivas de noticias y eventos corporativos.

## Positioning

Un canal de cartelería digital y dashboard ejecutivo de ultra-alta fidelidad concebido para pantallas 1080p y 4K desatendidas (kiosco 24/7). A diferencia de soluciones de software de terceros genéricas o tableros de BI recargados, entrega una experiencia inmersiva cinematográfica con rendimiento ligero y estética coordinada con la marca.

## Operating Context

- **Entorno físico:** Pantallas Smart TV y monitores de 55" a 85" colocados en paredes corporativas y recepciones.
- **Entorno técnico:** Navegador web en modo kiosco full-screen continuo (1920x1080 o superior).
- **Flujo de datos:** Actualizaciones asíncronas silenciosas vía Supabase Edge Functions y Firebase Realtime Database, con tolerancia a fallas de red mediante fallbacks realistas.

## Capabilities and Constraints

- Ejecución autónoma 24/7 sin recargas destructivas de página (no reload).
- Rotación automática de diapositivas con efecto pan & scan cinematográfico de 20 segundos por vista.
- Cintillo inferior (Marquee) con mensajes institucionales y monitor en vivo de la Sala de Juntas.
- Widgets laterales con datos de Pulse (Tareas por estatus y módulos), relojes mundiales y clima por propiedad, y efemérides.
- Sin interacción táctil obligatoria; legibilidad garantizada a más de 3 metros de distancia.

## Brand Commitments

- **Identidad:** The Palace Company (hospitalidad de lujo).
- **Paleta central:** Azul marino profundo (`#081119`, `#0D1B28`, `#122535`), toques de arena dorada / bronce (`#B88F69`, `#D4AF37`), y acentos limpios de estatus operacional.
- **Voz visual:** Serena, elegante, confiable y sofisticada; libre de halos artificiales, neones estridentes o modas efímeras.

## Evidence on Hand

- `index.html`: Dashboard principal en vivo.
- `admin.html`: Panel de control de noticias y ticker en tiempo real.
- `upload.html`: Interfaz de carga y compresión de diapositivas multimedia.
- `GUIA_POWER_AUTOMATE.md`: Integración con flujos automatizados de SharePoint y Teams.

## Product Principles

1. **Claridad a la distancia:** Tipografía, contraste y escala pensados para lectura periférica y de paso a 3–5 metros.
2. **Resiliencia absoluta:** Nunca mostrar ceros vacíos, pantallas blancas ni estados rotos ante caídas momentáneas de red.
3. **Artesanía sobria:** La distinción de marca proviene de la jerarquía tipográfica, el espacio y la composición, no de efectismos de videojuego.
