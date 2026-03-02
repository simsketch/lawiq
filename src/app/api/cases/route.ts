import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { cases } from '@/db/schema';
import { calculateExpectedSeverance, calculateExpectedBenefits } from '@/lib/calculations';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  const yearsEmployed = parseFloat(body.yearsEmployed ?? '0');
  const severanceWeeksExpected = calculateExpectedSeverance(yearsEmployed);
  const benefitsWeeksExpected = calculateExpectedBenefits(yearsEmployed);

  const [newCase] = await db
    .insert(cases)
    .values({
      userId,
      companyName: body.companyName ?? null,
      jobTitle: body.jobTitle ?? null,
      yearsEmployed: body.yearsEmployed ?? null,
      ageAtTermination: body.ageAtTermination ? parseInt(body.ageAtTermination) : null,
      terminationReason: body.terminationReason ?? null,
      severanceWeeksOffered: body.severanceWeeksOffered ?? null,
      severanceWeeksExpected: String(severanceWeeksExpected),
      benefitsWeeksOffered: body.benefitsWeeksOffered ?? null,
      benefitsWeeksExpected: String(benefitsWeeksExpected),
      hasWageConcerns: body.hasWageConcerns ?? false,
      wageConcernsDescription: body.wageConcernsDescription ?? null,
      narrative: body.narrative ?? null,
      finalDemands: body.finalDemands ?? null,
      emailTo: body.emailTo ?? null,
      status: 'draft',
    })
    .returning({ id: cases.id });

  return NextResponse.json({ id: newCase.id });
}
