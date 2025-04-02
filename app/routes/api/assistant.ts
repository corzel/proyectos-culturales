import { json } from "@remix-run/node";

export async function action({ request }) {
  const { prompt, section } = await request.json();
  
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000", // URL de tu app
      "X-Title": "Asistente de Proyectos Culturales" // Nombre de tu app
    },
    body: JSON.stringify({
      model: "qwen/qwen2.5-vl-3b-instruct:free",
      messages: [
        {
          role: "system",
          content: `Eres un asistente para formulación de proyectos culturales. 
          Estás ayudando con la sección: ${section}. 
          Proporciona orientación clara y ejemplos relevantes.`
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    })
  });

  const data = await response.json();
  return json({ response: data.choices[0].message.content });
}
