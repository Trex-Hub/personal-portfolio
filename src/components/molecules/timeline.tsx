import { CheckCircle2, Clock, PlayCircle, Calendar } from 'lucide-react';
import { Badge } from '@/components/atoms/badge';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'active' | 'future';
  category?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  showLegend?: boolean;
}

const getStatusConfig = (status: TimelineItem['status']) => {
  switch (status) {
    case 'completed':
      return {
        icon: CheckCircle2,
        iconColor: 'text-emerald-600',
        borderColor: 'border-emerald-500',
        textColor: 'text-emerald-700',
        dotShadow: 'shadow-sm',
      };
    case 'active':
      return {
        icon: PlayCircle,
        iconColor: 'text-amber-600',
        borderColor: 'border-amber-500',
        textColor: 'text-amber-700',
        dotShadow: 'shadow-sm',
      };
    case 'future':
      return {
        icon: Calendar,
        iconColor: 'text-slate-400',
        borderColor: 'border-slate-300',
        textColor: 'text-slate-600',
        dotShadow: 'shadow-sm',
      };
  }
};

const getCategoryColor = (category: string) => {
  const colors = {
    // Technical Categories
    Backend: 'bg-purple-100 text-purple-700 border-purple-200',
    Frontend: 'bg-blue-100 text-blue-700 border-blue-200',
    Database: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    DevOps: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    Security: 'bg-red-100 text-red-700 border-red-200',
    Testing: 'bg-teal-100 text-teal-700 border-teal-200',
    Infrastructure: 'bg-slate-100 text-slate-700 border-slate-200',

    // Feature Categories
    Feature: 'bg-green-100 text-green-700 border-green-200',
    Enhancement: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Bugfix: 'bg-rose-100 text-rose-700 border-rose-200',
    Optimization: 'bg-yellow-100 text-yellow-700 border-yellow-200',

    // AI/ML & Advanced Tech
    'AI/ML': 'bg-orange-100 text-orange-700 border-orange-200',
    Analytics: 'bg-amber-100 text-amber-700 border-amber-200',
    Integration: 'bg-violet-100 text-violet-700 border-violet-200',
    API: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',

    // Business & Process
    Research: 'bg-pink-100 text-pink-700 border-pink-200',
    Planning: 'bg-sky-100 text-sky-700 border-sky-200',
    Design: 'bg-lime-100 text-lime-700 border-lime-200',
    Documentation: 'bg-neutral-100 text-neutral-700 border-neutral-200',

    // Priority Levels
    Critical: 'bg-red-100 text-red-800 border-red-300 font-semibold',
    'High Priority':
      'bg-orange-100 text-orange-800 border-orange-300 font-semibold',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'Low Priority': 'bg-gray-100 text-gray-700 border-gray-300',

    // Business Categories
    Marketing: 'bg-pink-100 text-pink-700 border-pink-200',
    Sales: 'bg-green-100 text-green-700 border-green-200',
    Legal: 'bg-gray-100 text-gray-700 border-gray-200',
    Compliance: 'bg-red-100 text-red-700 border-red-200',

    // Team Categories
    Engineering: 'bg-blue-100 text-blue-700 border-blue-200',
    Product: 'bg-purple-100 text-purple-700 border-purple-200',
    UX: 'bg-pink-100 text-pink-700 border-pink-200',
    QA: 'bg-teal-100 text-teal-700 border-teal-200',

    // Scale & Business
    Enterprise: 'bg-gray-100 text-gray-700 border-gray-200',
    Startup: 'bg-green-100 text-green-700 border-green-200',
    MVP: 'bg-orange-100 text-orange-700 border-orange-200',
    Beta: 'bg-blue-100 text-blue-700 border-blue-200',

    // Release Types
    'Major Release':
      'bg-purple-100 text-purple-800 border-purple-300 font-semibold',
    'Minor Release': 'bg-blue-100 text-blue-700 border-blue-200',
    Patch: 'bg-green-100 text-green-700 border-green-200',
    Hotfix: 'bg-red-100 text-red-700 border-red-200',
  };
  return (
    colors[category as keyof typeof colors] ||
    'bg-gray-100 text-gray-700 border-gray-200'
  );
};

export default function Timeline({ items, showLegend = false }: TimelineProps) {
  return (
    <div className='max-w-4xl mx-auto p-6 not-prose'>
      <div className='relative'>
        {/* Timeline line */}
        <div className='absolute left-6 top-0 bottom-0 w-px bg-border' />

        <div className="space-y-8">
          {items.map((item) => {
            const config = getStatusConfig(item.status);
            const Icon = config.icon;

            return (
              <div key={item.id} className='relative flex items-start gap-4'>
                {/* Timeline dot */}
                <div
                  className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${config.borderColor} ${config.dotShadow} bg-background`}>
                  <Icon className={`w-5 h-5 ${config.iconColor}`} />
                </div>

                {/* Content */}
                <div className='flex-1 min-w-0 pb-6 items-start'>
                  <div className='flex items-center gap-2'>
                    <h3 className='text-lg font-semibold'>{item.title}</h3>
                    {item.category && (
                      <Badge
                        variant='outline'
                        className={`${getCategoryColor(
                          item.category
                        )} font-medium text-xs`}>
                        {item.category}
                      </Badge>
                    )}
                  </div>

                  <p className='text-muted-foreground mb-3 text-sm leading-relaxed'>
                    {item.description}
                  </p>

                  <div className='flex items-center gap-2'>
                    <Clock className='w-3.5 h-3.5 text-muted-foreground' />
                    <span className='text-xs text-muted-foreground font-medium'>
                      {item.date}
                    </span>
                    <span
                      className={`text-xs font-semibold ${config.textColor}`}>
                      {item.status === 'completed' && '✓ Completed'}
                      {item.status === 'active' && '⚡ In Progress'}
                      {item.status === 'future' && '📅 Planned'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Optional Legend */}
      {showLegend && (
        <div className='mt-12 p-4 bg-muted/30 rounded-lg'>
          <h4 className='font-semibold mb-3 text-sm'>Status Guide</h4>
          <div className='flex flex-wrap gap-4'>
            <div className='flex items-center gap-2'>
              <CheckCircle2 className='w-4 h-4 text-emerald-600' />
              <span className='text-xs'>Completed</span>
            </div>
            <div className='flex items-center gap-2'>
              <PlayCircle className='w-4 h-4 text-amber-600' />
              <span className='text-xs'>Active Development</span>
            </div>
            <div className='flex items-center gap-2'>
              <Calendar className='w-4 h-4 text-slate-400' />
              <span className='text-xs'>Future Scope</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
