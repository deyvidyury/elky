import { NextResponse } from 'next/server';
// ponytail: no SDK needed — raw fetch to OpenRouter, simpler and zero deps

const PRIMARY_MODEL = 'google/gemini-2.0-flash-exp';
const FALLBACK_MODEL = 'google/gemini-2.5-flash-lite';

function buildPrompt(fields: Record<string, string>): string {
  const hasInfo = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  return `Você é um redator comercial especializado em equipamentos e suprimentos para restaurantes no Brasil.

Escreva uma descrição profissional para o seguinte produto. A descrição deve ter entre 300 e 500 palavras, em português brasileiro, com tom persuasivo mas profissional. Destaque os benefícios práticos para donos de restaurantes, aplicações no dia a dia, e por que este produto é uma boa escolha.

Após o primeiro parágrafo, insira exatamente esta linha sozinha:

<!-- ADSENSE -->

Depois continue com o resto da descrição normalmente.

Dados do produto:
${hasInfo || '(apenas o nome foi informado)'}

Retorne APENAS a descrição pronta, sem introduções, sem "Aqui está a descrição:", sem markdown. Apenas o texto final.`;
}

async function callModel(model: string, fields: Record<string, string>) {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: buildPrompt(fields) }],
      temperature: 0.7,
      max_tokens: 1200,
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenRouter returned ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  return (data.choices?.[0]?.message?.content as string)?.trim() ?? '';
}

export async function POST(req: Request) {
  try {
    const fields = (await req.json()) as Record<string, string>;

    if (!fields.name) {
      return NextResponse.json(
        { error: 'O nome do produto é obrigatório.' },
        { status: 400 },
      );
    }

    // Try primary model first, fall back to secondary
    let description: string;
    try {
      description = await callModel(PRIMARY_MODEL, fields);
    } catch {
      description = await callModel(FALLBACK_MODEL, fields);
    }

    if (!description) {
      return NextResponse.json(
        { error: 'Não foi possível gerar a descrição. Tente novamente.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ description });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erro desconhecido' },
      { status: 500 },
    );
  }
}
