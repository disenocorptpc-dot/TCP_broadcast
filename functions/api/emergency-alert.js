/**
 * Cloudflare Pages Function: /api/emergency-alert
 * Webhook universal para recibir disparos de emergencia desde:
 * - Hardware receptor oficial SASMEX (SARMEX con relevador/Raspberry Pi/ESP32)
 * - Bots de monitoreo de Telegram o SkyAlert Enterprise
 * - Consolas externas de Protección Civil
 */

const EMERGENCY_SECRET = "palace-emergency-2026";

export async function onRequest(context) {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-emergency-secret",
        "Access-Control-Max-Age": "86400"
    };

    if (context.request.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    if (context.request.method === "GET") {
        return new Response(JSON.stringify({
            status: "ready",
            webhook_url: "https://tcp-broadcast.pages.dev/api/emergency-alert",
            supported_types: ["SISMO", "SIMULACRO", "HURACAN", "INCENDIO", "CLEAR"],
            instructions: "Envía un POST JSON con el campo secret y la configuración de alerta para activarla."
        }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
    }

    if (context.request.method === "POST") {
        try {
            const body = await context.request.json();
            const headerSecret = context.request.headers.get("x-emergency-secret");
            const providedSecret = body.secret || headerSecret;

            if (providedSecret !== EMERGENCY_SECRET) {
                return new Response(JSON.stringify({
                    error: "No autorizado. Token de seguridad inválido."
                }), {
                    status: 401,
                    headers: { ...corsHeaders, "Content-Type": "application/json" }
                });
            }

            const active = body.active !== false;
            const type = (body.type || "SISMO").toUpperCase();
            const source = body.source || "EXTERNAL_WEBHOOK";
            const title = body.title || (type === "SISMO" ? "¡ALERTA SÍSMICA!" : type === "SIMULACRO" ? "SIMULACRO PROGRAMADO" : "ALERTA DE EMERGENCIA");
            const subtitle = body.subtitle || (type === "SISMO" ? "Sismo detectado por la Red Oficial SASMEX" : "Activado por Protección Civil");
            const instructions_es = body.instructions_es || "Conserve la calma · Repliéguese a zonas de menor riesgo · No use elevadores · Siga indicaciones del personal";
            const instructions_en = body.instructions_en || "Keep calm · Move to structural safe zones · Do not use elevators · Follow staff instructions";
            const countdown = parseInt(body.countdown || 60, 10);

            const payload = {
                active,
                type,
                source,
                title,
                subtitle,
                instructions_es,
                instructions_en,
                countdown,
                timestamp: Date.now()
            };

            return new Response(JSON.stringify({
                success: true,
                message: active ? `Alerta de ${type} activada exitosamente.` : "Alerta de emergencia desactivada (Todo Despejado).",
                data: payload
            }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            });

        } catch (err) {
            return new Response(JSON.stringify({ error: err.message }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
        }
    }

    return new Response("Método no permitido", { status: 405, headers: corsHeaders });
}
