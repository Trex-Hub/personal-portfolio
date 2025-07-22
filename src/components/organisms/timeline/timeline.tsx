import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedText } from './rotating-text';
import Image from 'next/image';

export type EmploymentType =
  | 'internship'
  | 'full-time'
  | 'contract'
  | 'freelance'
  | 'community'
  | 'part-time';

export interface TimelineItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string | string[];
  employmentType: EmploymentType;
  current?: boolean;
  icon?: ReactNode;
  logo?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  rotationInterval?: number;
}

interface TimelineItemProps {
  item: TimelineItem;
  isLast: boolean;
  className?: string;
  rotationInterval?: number;
}

interface EmploymentBadgeProps {
  type: EmploymentType;
  current?: boolean;
}

function EmploymentBadge({ type, current = false }: EmploymentBadgeProps) {
  const badgeConfig = {
    internship: {
      label: 'Internship',
      className:
        'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
    },
    'full-time': {
      label: 'Full Time',
      className:
        'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800',
    },
    contract: {
      label: 'Contract',
      className:
        'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800',
    },
    freelance: {
      label: 'Freelance',
      className:
        'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800',
    },
    community: {
      label: 'Community',
      className:
        'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-800',
    },
    'part-time': {
      label: 'Part Time',
      className:
        'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800',
    },
  };

  const config = badgeConfig[type];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium transition-all duration-300',
        config.className,
        current &&
          'shadow-lg ring-2 ring-current ring-opacity-20 animate-pulse [animation-duration:2s]'
      )}
      role='status'
      aria-label={`Employment type: ${config.label}${current ? ' (Current position)' : ''}`}>
      {config.label}
    </span>
  );
}

function TimelineItemComponent({
  item,
  isLast,
  className,
  rotationInterval = 4000,
}: TimelineItemProps) {
  const descriptions = Array.isArray(item.description)
    ? item.description
    : [item.description];

  return (
    <div className={cn('relative flex gap-6 pb-8 not-prose', className)}>
      {/* Timeline line and dot */}
      <div className='flex flex-col items-center'>
        <div
          className={cn(
            'flex h-3 w-3 items-center justify-center rounded-full border-2 bg-background transition-colors duration-300',
            item.current
              ? 'border-primary bg-primary shadow-lg shadow-primary/20'
              : 'border-muted-foreground/30 hover:border-muted-foreground/50'
          )}>
          {item.icon && (
            <div
              className={cn(
                'h-2 w-2',
                item.current ? 'text-background' : 'text-muted-foreground'
              )}>
              {item.icon}
            </div>
          )}
        </div>
        {!isLast && <div className='mt-1 h-full w-px bg-muted-foreground/50' />}
      </div>

      {/* Content */}
      <div className='flex-1 space-y-3 pb-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2 flex-wrap'>
            {item.logo && (
              <Image src={item.logo} alt={item.title} width={24} height={24} />
            )}
            <h3 className='font-semibold text-foreground text-lg'>
              {item.title}
            </h3>
            <EmploymentBadge
              type={item.employmentType}
              current={item.current}
            />
          </div>
          <div className='flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-2'>
            <span className='font-medium'>{item.company}</span>
            <span className='hidden sm:inline'>•</span>
            <span className='text-muted-foreground/90'>{item.period}</span>
          </div>
        </div>

        {/* Rotating description */}
        <div className='text-sm text-muted-foreground leading-relaxed min-h-[3rem] flex items-start overflow-hidden'>
          <AnimatedText
            text={descriptions}
            interval={rotationInterval}
            className='block w-full'
          />
        </div>
      </div>
    </div>
  );
}

export function Timeline({
  items,
  className,
  rotationInterval = 4000,
}: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {items.map((item, index) => (
        <TimelineItemComponent
          key={item.id}
          item={item}
          isLast={index === items.length - 1}
          rotationInterval={rotationInterval}
        />
      ))}
    </div>
  );
}
