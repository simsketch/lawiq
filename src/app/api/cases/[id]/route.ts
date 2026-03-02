import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { cases } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
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

  return NextResponse.json(c);
}

export async function PATCH(req: Request, { params }: Params) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const [updated] = await db
    .update(cases)
    .set({
      finalDemands: body.finalDemands,
      emailTo: body.emailTo ?? null,
      updatedAt: new Date(),
    })
    .where(and(eq(cases.id, id), eq(cases.userId, userId)))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(updated);
}
