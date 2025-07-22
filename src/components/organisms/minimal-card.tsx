import * as React from 'react';
import {
  MinimalCard as MinimalCardMolecule,
  MinimalCardImage,
  MinimalCardTitle,
  MinimalCardDescription,
  MinimalCardContent,
  MinimalCardFooter,
} from '@/components/molecules/minimal-card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface MinimalCardOrganismProps {
  // Main card props
  className?: string;

  // Image props
  src?: string;
  alt?: string;
  imageClassName?: string;
  priority?: boolean;

  // Title props
  title?: string;
  titleClassName?: string;

  // Description props
  description?: string;
  descriptionClassName?: string;

  // Content props (for additional custom content)
  children?: React.ReactNode;
  contentClassName?: string;

  // Footer props
  footer?: React.ReactNode;
  footerClassName?: string;

  // Link props
  href?: string;
}

const MinimalCard = React.forwardRef<HTMLDivElement, MinimalCardOrganismProps>(
  (
    {
      className,
      src,
      alt,
      imageClassName,
      title,
      titleClassName,
      description,
      descriptionClassName,
      children,
      contentClassName,
      footer,
      footerClassName,
      href,
      priority,
      ...props
    },
    ref
  ) => {
    return (
      <Link
        href={href ?? '#'}
        className='no-underline text-inherit hover:no-underline focus:no-underline active:no-underline visited:no-underline'>
        <MinimalCardMolecule
          ref={ref}
          className={cn('m-2 w-[28.75rem] not-prose', className)}
          {...props}>
          {src && alt && (
            <MinimalCardImage
              className={cn('h-[20rem]', imageClassName)}
              src={src}
              alt={alt}
              priority={priority ?? true}
            />
          )}

          {title && (
            <MinimalCardTitle className={titleClassName}>
              {title}
            </MinimalCardTitle>
          )}

          {description && (
            <MinimalCardDescription className={descriptionClassName}>
              {description}
            </MinimalCardDescription>
          )}

          {children && (
            <MinimalCardContent className={contentClassName}>
              {children}
            </MinimalCardContent>
          )}

          {footer && (
            <MinimalCardFooter className={footerClassName}>
              {footer}
            </MinimalCardFooter>
          )}
        </MinimalCardMolecule>
      </Link>
    );
  }
);

MinimalCard.displayName = 'MinimalCard';

export default MinimalCard;
export type { MinimalCardOrganismProps };
