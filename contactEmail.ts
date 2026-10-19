import nodemailer from 'nodemailer';

export interface ContactSubmission {
  name: string;
  phone: string;
  destination: string;
  serviceType: string;
  budget: string;
  travelDate: string;
  notes: string;
  travelers: number;
  duration: number;
}

export class ContactEmailConfigurationError extends Error {}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readText(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const text = value.trim();
  return text.length > 0 && text.length <= maxLength ? text : undefined;
}

export function parseContactSubmission(value: unknown): ContactSubmission | undefined {
  if (!isRecord(value)) return undefined;

  const name = readText(value.name, 120);
  const phone = readText(value.phone, 60);
  const destination = readText(value.destination, 160);
  const serviceType = readText(value.serviceType, 160);
  const budget = readText(value.budget, 40);
  const travelDate = readText(value.travelDate, 40);
  const notes =
    value.notes === undefined
      ? ''
      : typeof value.notes === 'string' && value.notes.length <= 3000
        ? value.notes.trim()
        : undefined;
  const travelers = value.travelers;
  const duration = value.duration;

  if (
    !name ||
    !phone ||
    !destination ||
    !serviceType ||
    !budget ||
    !travelDate ||
    notes === undefined ||
    typeof travelers !== 'number' ||
    !Number.isInteger(travelers) ||
    travelers < 1 ||
    travelers > 50 ||
    typeof duration !== 'number' ||
    !Number.isInteger(duration) ||
    duration < 1 ||
    duration > 30
  ) {
    return undefined;
  }

  return { name, phone, destination, serviceType, budget, travelDate, notes, travelers, duration };
}

export async function deliverContactEmail(submission: ContactSubmission): Promise<void> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM;
  const secureSetting = process.env.SMTP_SECURE;

  if (
    !smtpHost ||
    !smtpUser ||
    !smtpPass ||
    !smtpFrom ||
    !Number.isInteger(smtpPort) ||
    smtpPort < 1 ||
    smtpPort > 65535 ||
    (secureSetting !== undefined && secureSetting !== 'true' && secureSetting !== 'false')
  ) {
    throw new ContactEmailConfigurationError('SMTP configuration is incomplete or invalid.');
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: secureSetting === undefined ? smtpPort === 465 : secureSetting === 'true',
    auth: { user: smtpUser, pass: smtpPass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000
  });

  await transporter.sendMail({
    from: smtpFrom,
    to: 'remaxsafaris@gmail.com',
    subject: 'New Remax Safaris enquiry',
    text: [
      'A new enquiry was submitted through the Remax Safaris website.',
      '',
      `Name: ${submission.name}`,
      `Phone: ${submission.phone}`,
      `Destination: ${submission.destination}`,
      `Service: ${submission.serviceType}`,
      `Travelers: ${submission.travelers}`,
      `Preferred travel date: ${submission.travelDate}`,
      `Duration: ${submission.duration} days`,
      `Budget: ${submission.budget}`,
      `Special requests: ${submission.notes || 'None'}`
    ].join('\n')
  });
}
