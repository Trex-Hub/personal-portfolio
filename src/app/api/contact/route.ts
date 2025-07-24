import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { RESEND_API_KEY, EMAIL_FROM, EMAIL_TO } from '@/lib/constant';
import ContactEmailTemplate from '@/components/emails/contact';
import logger from '@/lib/logger';

const resend = new Resend(RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { name, email, phone, message } = await request.json();
  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: 'Someone Contacted You - Portfolio',
      react: await ContactEmailTemplate({ name, email, phone, message }),
      text: `Someone Contacted You - Portfolio. Name: ${name}, Email: ${email}, Phone: ${phone}, Message: ${message}`,
    });
    logger.info('Message sent');
    return NextResponse.json({ message: 'Message sent' });
  } catch (error) {
    logger.error(error);
    return NextResponse.json({ message: 'Message not sent' }, { status: 500 });
  }
}
