export async function onRequest(context) {
  const url = "https://erzslftfrqqiadumbpod.supabase.co/functions/v1/get-broadcast-metrics";
  const apiKey = "814c46a71eed489888f2606c70de9d18";
  
  // Handle preflight requests (OPTIONS)
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "x-api-key, Content-Type, Accept",
        "Access-Control-Max-Age": "86400"
      }
    });
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Accept": "application/json"
      }
    });
    
    if (!response.ok) {
      return new Response(JSON.stringify({ error: `Supabase returned status ${response.status}` }), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "*"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}
