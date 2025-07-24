import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ContactEmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactEmailTemplate: React.FC<
  Readonly<ContactEmailTemplateProps>
> = ({ name, email, phone, message }) => {
  const previewText = `New contact form submission from ${name}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Form Submission</Heading>
          <Text style={text}>
            You have received a new contact form submission:
          </Text>

          <Section style={section}>
            <Text style={labelText}>Name:</Text>
            <Text style={contentText}>{name}</Text>

            <Text style={labelText}>Email:</Text>
            <Text style={contentText}>{email}</Text>

            <Text style={labelText}>Phone Number:</Text>
            <Text style={contentText}>{phone || 'No Phone Number'}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={labelText}>Message:</Text>
            <Text style={messageText}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 20px',
  borderRadius: '8px',
  maxWidth: '600px',
};

const h1 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.25',
  marginBottom: '24px',
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '20px',
};

const section = {
  marginBottom: '32px',
};

const labelText = {
  color: '#6b7280',
  fontSize: '14px',
  marginBottom: '4px',
};

const contentText = {
  color: '#1f2937',
  fontSize: '16px',
  marginBottom: '16px',
};

const messageText = {
  color: '#1f2937',
  fontSize: '16px',
  lineHeight: '24px',
  whiteSpace: 'pre-wrap',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '20px 0',
};

export default ContactEmailTemplate;
