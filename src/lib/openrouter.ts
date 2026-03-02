import OpenAI from 'openai';

export const openrouter = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY!,
  defaultHeaders: {
    'HTTP-Referer': 'https://lawiq.app',
    'X-Title': 'LawIQ',
  },
});

export const DEFAULT_MODEL = 'anthropic/claude-sonnet-4-5';
