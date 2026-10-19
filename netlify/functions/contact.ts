import {
  ContactEmailConfigurationError,
  deliverContactEmail,
  parseContactSubmission
} from '../../contactEmail';

interface NetlifyEvent {
  httpMethod: string;
  body: string | null;
}

interface NetlifyResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

function jsonResponse(statusCode: number, value: Record<string, unknown>): NetlifyResponse {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(value)
  };
}

export async function handler(event: NetlifyEvent): Promise<NetlifyResponse> {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed.' });
  }

  let body: unknown;
  try {
    body = event.body ? JSON.parse(event.body) : undefined;
  } catch {
    return jsonResponse(400, { error: 'Please provide a valid enquiry.' });
  }

  const submission = parseContactSubmission(body);
  if (!submission) {
    return jsonResponse(400, { error: 'Please check your enquiry details and try again.' });
  }

  try {
    await deliverContactEmail(submission);
    return jsonResponse(200, { ok: true });
  } catch (error) {
    if (error instanceof ContactEmailConfigurationError) {
      console.error('Contact email delivery is unavailable:', error.message);
      return jsonResponse(503, { error: 'Email delivery is temporarily unavailable. Please try again later or contact us by WhatsApp.' });
    }
    console.error(
      'Contact email delivery failed:',
      error instanceof Error ? error.message : 'Unknown SMTP error'
    );
    return jsonResponse(502, { error: 'We could not send your enquiry right now. Please try again or contact us by WhatsApp.' });
  }
}
