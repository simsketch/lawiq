import { pgSchema, uuid, text, timestamp, numeric, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

export const lawiqSchema = pgSchema('lawiq');

export const cases = lawiqSchema.table('cases', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),

  // Step 1: Employment
  companyName: text('company_name'),
  jobTitle: text('job_title'),
  yearsEmployed: numeric('years_employed'),
  ageAtTermination: integer('age_at_termination'),
  terminationReason: text('termination_reason'),

  // Step 2: Severance & Benefits
  severanceWeeksOffered: numeric('severance_weeks_offered'),
  severanceWeeksExpected: numeric('severance_weeks_expected'),
  benefitsWeeksOffered: numeric('benefits_weeks_offered'),
  benefitsWeeksExpected: numeric('benefits_weeks_expected'),

  // Step 3: Wages
  hasWageConcerns: boolean('has_wage_concerns').default(false),
  wageConcernsDescription: text('wage_concerns_description'),

  // Step 4: Narrative
  narrative: text('narrative'),

  // Step 5 / Output
  finalDemands: jsonb('final_demands'),
  generatedEmail: text('generated_email'),
  status: text('status').default('draft'),

  // Metadata
  emailTo: text('email_to'),
});

export type Case = typeof cases.$inferSelect;
export type NewCase = typeof cases.$inferInsert;
