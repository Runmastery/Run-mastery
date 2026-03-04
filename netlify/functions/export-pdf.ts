import type { Handler } from '@netlify/functions';

export const handler: Handler = async () => {
  return { statusCode: 501, body: JSON.stringify({ error: 'PDF export scaffolded. Implement with pdfkit rendering in deployment env.' }) };
};
