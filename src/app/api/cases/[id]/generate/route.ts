import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { cases } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { openrouter, DEFAULT_MODEL } from '@/lib/openrouter';
import { SYSTEM_PROMPT, buildUserPrompt } from '@/lib/prompts';

type Params = { params: Promise<{ id: string }> };

export async function POST(_req: Request, { params }: Params) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const [c] = await db
    .select()
    .from(cases)
    .where(and(eq(cases.id, id), eq(cases.userId, userId)));

  if (!c) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // Update status to analyzing
  await db
    .update(cases)
    .set({ status: 'analyzing', updatedAt: new Date() })
    .where(eq(cases.id, id));

  const userPrompt = buildUserPrompt(c);

  const stream = await openrouter.chat.completions.create({
    model: DEFAULT_MODEL,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
    stream: true,
    max_tokens: 2000,
  });

  let fullText = '';

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta?.content ?? '';
          if (delta) {
            fullText += delta;
            controller.enqueue(encoder.encode(delta));
          }
        }

        // Save complete email to DB
        await db
          .update(cases)
          .set({ generatedEmail: fullText, status: 'complete', updatedAt: new Date() })
          .where(eq(cases.id, id));

        controller.close();
      } catch (err) {
        console.error('Generation error:', err);
        await db
          .update(cases)
          .set({ status: 'draft', updatedAt: new Date() })
          .where(eq(cases.id, id));
        controller.error(err);
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'X-Case-Id': id,
    },
  });
}
