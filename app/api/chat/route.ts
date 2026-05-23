import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages, system } = await req.json()

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 300,
        messages: [
          { role: 'system', content: system },
          ...messages,
        ],
      }),
    })

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || 'No pude procesar tu mensaje.'

    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ content: 'Error al conectar con el agente.' }, { status: 500 })
  }
}
