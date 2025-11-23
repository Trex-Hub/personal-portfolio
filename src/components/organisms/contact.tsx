'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/atoms/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/form';
import { Input } from '@/components/atoms/input';
import { Textarea } from '@/components/atoms/textarea';
import { PhoneInput } from './phone-number';
import { ContactFormSchema, ContactFormSchemaType } from '@/schema/contact';
import { sendContactForm } from '@/services/api';
import { toast } from 'sonner';

export default function ContactForm() {
  const form = useForm<ContactFormSchemaType>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  function onSubmit(values: ContactFormSchemaType) {
    sendContactForm(values).then(() => {
      toast.success('Message sent successfully');
      form.reset();
    });
  }

  return (
    <div className='not-prose'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium'>
                    Name <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Your full name'
                      className='h-10'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium'>
                    Email <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='your.email@example.com'
                      className='h-10'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-medium'>
                  Phone Number{' '}
                  <span className='text-muted-foreground text-xs'>
                    (Optional)
                  </span>
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder='+91 9876543210'
                    className='h-10 rounded-e-lg rounded-s-none'
                    defaultCountry='IN'
                    international={false}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-medium'>
                  Message <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Tell me about your project, question, or how I can help you...'
                    className='min-h-[120px] resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='pt-4'>
            <Button
              type='submit'
              className='w-full md:w-auto px-8 h-10'
              disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </Form>

      <div className='mt-8 pt-6 border-t border-border'>
        <p className='text-sm text-muted-foreground'>
          You can also reach me directly at{' '}
          <a
            href='mailto:me@dev8s.io'
            className='text-foreground hover:underline font-medium'>
            me@dev8s.io
          </a>
        </p>
      </div>
    </div>
  );
}
