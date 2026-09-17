---
name: TCP Broadcast Design System
description: Executive & Hospitality Digital Signage Design System for The Palace Company
colors:
  primary: "#B88F69"
  primary-glow: "rgba(184, 143, 105, 0.25)"
  background: "#081119"
  surface-glass: "rgba(13, 27, 40, 0.72)"
  surface-border: "rgba(184, 143, 105, 0.14)"
  marine-deep: "#122535"
  marine-mid: "#1C3549"
  text-main: "#EDECE4"
  text-muted: "#8C9BA5"
  status-success: "#4ade80"
  status-warning: "#ffb020"
  status-danger: "#ff4a5a"
  status-info: "#4fa8ff"
typography:
  display:
    fontFamily: "'Space Grotesk', 'Public Sans', sans-serif"
    fontSize: "3.5rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Public Sans', sans-serif"
    fontSize: "2.2rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.02em"
  body:
    fontFamily: "'Public Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  data-label:
    fontFamily: "'Public Sans', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
  pill: "9999px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  card-widget:
    backgroundColor: "{colors.surface-glass}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.lg}"
    padding: "20px 24px"
  ticker-label:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.marine-deep}"
    typography: "{typography.headline}"
    padding: "0 40px"
---

## Overview

TCP Broadcast Command Center es una interfaz digital signage de transmisión continua (24/7) instalada en salas corporativas y recepciones ejecutivas de The Palace Company. Diseñada para pantallas de gran formato (1080p / 4K) vistas a distancias de 2 a 6 metros, prioriza la calma visual, la sofisticación de hospitalidad y la absorción instantánea de métricas operacionales clave.

## Colors

La paleta se inspira en el océano profundo nocturno y la arena fina del Caribe:
- **Azul Marino Profundo (`#081119`, `#0D1B28`, `#122535`):** Actúa como base neutral de alta inmersión, evitando la fatiga ocular que generan los fondos claros en pantallas grandes.
- **Arena Dorada / Bronce (`#B88F69`):** El acento primario institucional, transmitiendo calidez, lujo y distinción hotelera.
- **Blancos Suaves (`#EDECE4`):** Color del texto principal para garantizar contraste AAA sin el brillo cegador del blanco puro `#FFFFFF`.
- **Estatus Operacional Semántico:** Tonos seleccionados para no saturar: verde esmeralda (`#4ade80`), ámbar cálido (`#ffb020`), carmesí refinado (`#ff4a5a`) y azul zafiro (`#4fa8ff`).

## Typography

- **Títulos y Display:** `Space Grotesk` y `Public Sans` con pesos 700 y 800 para una presencia institucional rotunda y moderna.
- **Cuerpo y Widgets:** `Public Sans` en pesos 400 a 700 para una legibilidad perfecta en movimiento o a distancia.
- **Valores numéricos y relojes:** Emplean `font-variant-numeric: tabular-nums` para que el conteo y actualización por segundo no altere el ancho de los contenedores.
- **Suelo mínimo de tamaño:** Todo texto funcional de datos o etiquetas cumple un mínimo de 12px (`0.75rem`), erradicando etiquetas diminutas que fallan en pantallas 4K.

## Layout

- **Estructura Grid Principal:** 3 columnas (Sidebar izquierda: métricas y vacaciones; Área Central: Hero cinemático / galería institucional; Sidebar derecha: relojes mundiales, clima, distribución y cumpleaños).
- **Fila Inferior:** Ticker / Marquee broadcast de ancho completo (100vw), con sección dedicada de estado en vivo de la Sala de Juntas.
- **Relación de aspecto:** Bloqueado y optimizado para 16:9 sin scrollbars visibles (`overflow: hidden`).

## Elevation & Depth

- Se erradica el uso de resplandores de colores artificiales (`dark-glow` / halos de color tipo videojuego).
- La profundidad se logra mediante oclusión ambiental realista con sombras direccionales difusas (`box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45)`) y bordes de cristal con tinte dorado sutil (`1px solid rgba(184, 143, 105, 0.14)`).
- Fondos de tarjetas con `backdrop-filter: blur(16px)` para integrar armónicamente con las transiciones del fondo.

## Shapes

- Esquinas refinadas: `20px` para contenedores de primer nivel (widgets y hero), `10px` para elementos de lista internos, y `9999px` (píldora) para badges de estatus.
- Proporciones simétricas con padding generoso para evitar agrupamientos apretados.

## Components

- **Widget Card:** Contenedor de cristal templado oscuro con cabecera semántica `h2` acompañada de icono Lucide a juego.
- **Hero Carousel:** Marco cinemático con movimiento sutil Pan & Scan continuo (20s) y transición cruzada suave (fade 1.2s).
- **Ticker Marquee:** Banda inferior con etiqueta destacada de categoría y carrusel de texto animado a velocidad de lectura cómoda (25s - 30s loop), incluyendo la píldora de pulso de la Sala de Juntas.
- **World Clock:** Bloque horario con ciudad en mayúsculas micro-espaciadas y números tabulares.

## Do's and Don'ts

### Do:
- Mantener las cifras operacionales siempre con datos legibles y valores de respaldo si el backend no responde.
- Usar mayúsculas espaciadas (`letter-spacing: 0.05em`) únicamente en etiquetas y metadatos.
- Probar la legibilidad simulando visualización a 3 metros.

### Don't:
- No aplicar degradados de color en el texto (`background-clip: text`), ya que restan seriedad y legibilidad.
- No colocar sombras con halos de colores saturados en fondos oscuros.
- No saltar niveles en la jerarquía de encabezados (`h1` -> `h3`). Usar siempre `h2` para los módulos.
- No dejar textos funcionales por debajo de 11px.
