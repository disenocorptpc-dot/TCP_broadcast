/**
 * Cloudflare Pages Function: /api/sasmex-monitor
 * Monitorea en tiempo real el canal oficial de SASMEX en Telegram (@SASMEX_Oficial)
 * para detectar avisos de Alerta Sísmica emitidos por CIRES A.C.
 */

export async function onRequest(context) {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Accept",
        "Access-Control-Max-Age": "86400"
    };

    if (context.request.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const telegramUrl = "https://t.me/s/SASMEX_Oficial";
        const response = await fetch(telegramUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
            }
        });

        if (!response.ok) {
            throw new Error(`Telegram respondió con status ${response.status}`);
        }

        const html = await response.text();

        // Extraer mensajes con regex compatible con Cloudflare V8
        const postRegex = /<div class="tgme_widget_message\b[^"]*"[^>]*data-post="([^"]+)"[\s\S]*?<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>[\s\S]*?<time datetime="([^"]+)"/g;
        
        const messages = [];
        let match;
        while ((match = postRegex.exec(html)) !== null) {
            const postId = match[1];
            const rawText = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
            const time = match[3];

            // Analizar tipo de mensaje
            const upper = rawText.toUpperCase();
            const hasAlertaSismica = upper.includes("ALERTA SÍSMICA") || upper.includes("ALERTA SISMICA");
            const noAmerita = upper.includes("NO AMERITÓ") || upper.includes("NO AMERITO");
            const isDrill = upper.includes("SIMULACRO") || upper.includes("PRUEBA");
            
            let type = "INFO";
            let isAlert = false;

            if (isDrill) {
                type = "SIMULACRO";
                isAlert = hasAlertaSismica;
            } else if (hasAlertaSismica && !noAmerita) {
                type = "ALERTA_SISMICA";
                isAlert = true;
            } else if (noAmerita) {
                type = "NO_AMERITA";
                isAlert = false;
            } else if (upper.includes("SISMO DETECTADO") || upper.includes("TENEMOSSISMO")) {
                type = "SISMO_DETECTADO";
                isAlert = false;
            }

            // Extraer sensor si está disponible
            let sensor = "";
            const sensorMatch = rawText.match(/Sensor cercano:?\s*([^#\.\n]+)/i) || rawText.match(/en Costa de\s*([^#\.\n]+)/i);
            if (sensorMatch) {
                sensor = sensorMatch[1].trim();
            }

            messages.push({
                postId,
                time,
                text: rawText,
                type,
                isAlert,
                isDrill,
                sensor
            });
        }

        // Determinar el estado más reciente
        const latest = messages.length > 0 ? messages[messages.length - 1] : null;

        // Comprobar si hay una alerta activa reciente (últimos 8 minutos)
        let hasActiveAlert = false;
        let activeAlertData = null;

        if (latest) {
            const now = Date.now();
            const postTime = new Date(latest.time).getTime();
            const ageMinutes = (now - postTime) / (1000 * 60);

            // Si la alerta tiene menos de 8 minutos y fue clasificada como alerta real o simulacro
            if (latest.isAlert && ageMinutes <= 8) {
                hasActiveAlert = true;
                activeAlertData = latest;
            }
        }

        return new Response(JSON.stringify({
            success: true,
            source: "@SASMEX_Oficial",
            lastChecked: new Date().toISOString(),
            hasActiveAlert,
            activeAlertData,
            latest,
            recentCount: messages.length,
            recent: messages.slice(-5)
        }), {
            headers: {
                ...corsHeaders,
                "Content-Type": "application/json"
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: error.message,
            lastChecked: new Date().toISOString()
        }), {
            status: 500,
            headers: {
                ...corsHeaders,
                "Content-Type": "application/json"
            }
        });
    }
}
