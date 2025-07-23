import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className='flex items-end gap-2'>
        <Image src='/icon.png' alt='Logo' width={24} height={24} />
        <p className='font-semibold'>Dev&apos;s Portfolio</p>
      </div>
    ),
  },
};
