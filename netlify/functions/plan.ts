import type { Handler, HandlerEvent } from '@netlify/functions';
import { generatePlan } from '../../src/lib/planGenerator';

export const handler: Handler = async (event: HandlerEvent) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const plan = generatePlan(body.profile);
    return { statusCode: 200, body: JSON.stringify(plan) };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify({ error: (error as Error).message }) };
  }
};
