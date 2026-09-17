# 🚀 Guía de Integración: Power Automate & Portal de Portadas Broadcast

Esta guía detalla cómo automatizar el recordatorio semanal para diseñadores y colaboradores utilizando **Microsoft Power Automate**, de modo que alimenten la pantalla corporativa en menos de 1 minuto a través de la nueva aplicación web ligera: [`upload.html`](upload.html).

---

## 🎯 ¿Cómo Funciona la Solución?

```
[Power Automate: Recurrence (Lunes 9:30 AM)]
                    │
                    ▼
[Notificación en Microsoft Teams o Correo Outlook]
 (Copy motivador + Botón con tema semanal)
                    │
                    ▼ Clic del colaborador
[Web App Ligera: upload.html?tema=...]
 (Se abre en celular o PC, pre-llena tema, comprime foto)
                    │
                    ▼ Guardar
[Firebase Firestore] ──► ¡En vivo en la TV en 10 segundos!
```

---

## 📅 Matriz de Temas Semanales y URLs

Puedes configurar una URL directa para cada semana del mes. Cuando el colaborador entra a la liga, el formulario ya muestra el tema sugerido automáticamente:

| Semana | Tema Sugerido | Enfoque | URL Parametrizada |
|---|---|---|---|
| **Semana 1** | **Renders y Proyectos 3D** | Renders de espacios, mobiliario, remodelaciones o conceptos visuales | `https://tu-dominio.com/upload.html?tema=Renders%20y%20Proyectos%203D` |
| **Semana 2** | **Lanzamientos y Montajes** | Fotos de eventos, montajes en hoteles, aperturas y señalética | `https://tu-dominio.com/upload.html?tema=Lanzamientos%20y%20Montajes` |
| **Semana 3** | **Detrás de Cámaras & Taller** | Procesos creativos, fotos de producción, fotos en taller o shootings | `https://tu-dominio.com/upload.html?tema=Detras%20de%20Camaras` |
| **Semana 4** | **Momentos de Color & Éxitos** | Reconocimientos, fotos del equipo, hitos alcanzados y celebraciones | `https://tu-dominio.com/upload.html?tema=Momentos%20de%20Color` |

> *Nota: Sustituye `https://tu-dominio.com` por la URL real donde esté hosteado el proyecto (Cloudflare Pages, Firebase Hosting o servidor local).*

---

## ✍️ Propuestas de Copywriting

### Opción 1: Mensaje para Microsoft Teams (Cálido y Dinámico)
> **📢 ¡Presúmenos lo que has hecho esta semana!**
> 
> Hola equipo 👋
> Es momento de que todo el corporativo vea lo que estás creando. ¿En qué estuviste trabajando estos días? Cuéntale a todos.
> 
> 🎯 **Tema sugerido de esta semana:** *@{variables('TemaSemana')}*
> 
> Tómale foto o sube tu render en 30 segundos desde tu celular o computadora y aparecerá de inmediato en la rotación de las pantallas principales:
> 
> 👉 **[Subir mi Portada al Broadcast](@{variables('UrlUpload')})**

---

### Opción 2: Correo Electrónico en Outlook (Formato Revista Corporativa)

**Asunto:** `✨ Presúmenos lo que has hecho esta semana | TCP Broadcast`

**Cuerpo (HTML / Enriquecido):**
```html
<div style="font-family: Arial, sans-serif; background: #081119; color: #EDECE4; padding: 30px; border-radius: 12px; max-width: 550px;">
    <h2 style="color: #B88F69; margin-top: 0; font-size: 22px;">🎨 ¡Es momento de presumir tu talento!</h2>
    <p style="font-size: 15px; line-height: 1.5; color: #EDECE4;">
        ¿Qué proyecto, render o foto increíble sacaste esta semana? No lo dejes guardado en tu carpeta de archivos: <strong>cuéntale a todos y muéstralo en las pantallas del corporativo</strong>.
    </p>
    <div style="background: rgba(255,255,255,0.05); border-left: 3px solid #B88F69; padding: 12px 16px; margin: 20px 0; border-radius: 4px;">
        <span style="font-size: 12px; text-transform: uppercase; color: #B88F69; font-weight: bold;">Enfoque de esta semana:</span>
        <div style="font-size: 16px; font-weight: bold; margin-top: 4px; color: #fff;">@{variables('TemaSemana')}</div>
    </div>
    <p style="font-size: 14px; color: rgba(237,236,228,0.7);">
        Solo te tomará 30 segundos. Sube la imagen desde tu celular o laptop y se optimizará automáticamente para la TV:
    </p>
    <div style="text-align: center; margin: 25px 0;">
        <a href="@{variables('UrlUpload')}" style="background: #B88F69; color: #081119; text-decoration: none; padding: 14px 28px; font-weight: bold; border-radius: 8px; font-size: 15px; display: inline-block;">
            🚀 Subir mi foto al Broadcast
        </a>
    </div>
    <div style="font-size: 11px; color: rgba(237,236,228,0.5); text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px;">
        The Palace Company • Broadcast Command Center
    </div>
</div>
```

---

### Opción 3: Adaptive Card para Teams (JSON directo para Power Automate)

Si usas la acción **"Publicar tarjeta adaptable en un chat o canal"** en Power Automate, pega este JSON:

```json
{
  "type": "AdaptiveCard",
  "version": "1.4",
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "body": [
    {
      "type": "TextBlock",
      "size": "Medium",
      "weight": "Bolder",
      "color": "Warning",
      "text": "✨ Presúmenos lo que has hecho esta semana"
    },
    {
      "type": "TextBlock",
      "text": "¡Hola equipo! ¿En qué estuviste trabajando estos días? Cuéntale a todo el corporativo y luce tu proyecto en las pantallas centrales.",
      "wrap": true
    },
    {
      "type": "Container",
      "style": "emphasis",
      "items": [
        {
          "type": "TextBlock",
          "text": "🎯 **Tema sugerido de la semana:**",
          "weight": "Bolder",
          "size": "Small"
        },
        {
          "type": "TextBlock",
          "text": "@{variables('TemaSemana')}",
          "size": "Medium",
          "weight": "Bolder",
          "color": "Accent"
        }
      ]
    },
    {
      "type": "TextBlock",
      "text": "Toca el botón para cargar tu imagen en menos de 30 segundos (se optimiza sola para la TV):",
      "wrap": true,
      "size": "Small"
    }
  ],
  "actions": [
    {
      "type": "Action.OpenUrl",
      "title": "🚀 Subir Portada al Broadcast",
      "url": "@{variables('UrlUpload')}"
    }
  ]
}
```

---

## 🛠️ Configuración Paso a Paso en Power Automate

1. **Crear Flujo de Nube Programado (Scheduled Cloud Flow):**
   - **Nombre:** `Recordatorio Semanal Broadcast Portadas`
   - **Periodicidad:** Cada 1 semana, los días **Lunes a las 09:30 AM** (Zona Horaria: UTC-05:00 Cancún / CDMX).

2. **Inicializar Variable para la Semana (Opcional para rotar temas):**
   - Acción: **Initialize variable**
   - Nombre: `SemanaDelMes`
   - Tipo: `Integer`
   - Valor (expresión): `mod(div(dayOfMonth(utcNow()), 7), 4)` *(da un valor del 0 al 3)*.

3. **Definir Tema y URL según la semana (Switch o Condición):**
   - Si `SemanaDelMes` = 0 ➔ Tema = `Renders y Proyectos 3D`
   - Si `SemanaDelMes` = 1 ➔ Tema = `Lanzamientos y Montajes`
   - Si `SemanaDelMes` = 2 ➔ Tema = `Detrás de Cámaras`
   - Si `SemanaDelMes` = 3 ➔ Tema = `Momentos de Color`
   - *O de forma simplificada:* Puedes usar una sola URL fija (`https://tu-dominio.com/upload.html`) y cambiar el texto del copy.

4. **Enviar Notificación:**
   - **Para Microsoft Teams:** Añade la acción *Post message in a chat or channel* (o *Post adaptive card in a chat or channel*).
   - **Para Outlook:** Añade la acción *Send an email (V2)* con el grupo de distribución de diseñadores.

---

## 🧹 Higiene Automática de Imágenes

Recuerda que:
1. **Compresión al vuelo:** Cada vez que un diseñador sube una imagen en `upload.html`, el navegador la comprime en Canvas a formato JPEG optimizado (~100-200 KB), evitando la saturación del almacenamiento de Firestore.
2. **Auto-vencimiento:** Cada portada tiene un tiempo de caducidad fijado en **7 días**.
3. **Depuración periódica:** `upload.html` y `admin.html` ejecutan automáticamente la purga de documentos expirados al iniciar, y también puedes oprimir el botón **"🧹 Depurar Expiradas"** en `admin.html` cuando lo desees.
