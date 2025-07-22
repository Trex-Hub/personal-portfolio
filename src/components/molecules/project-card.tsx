import Image from 'next/image';
import { Badge } from '@/components/atoms/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import { ExternalLink, Github, Play } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  isVideo?: boolean;
}

export default function ProjectCard({
  title,
  description,
  image,
  techStack,
  githubUrl,
  liveUrl,
  isVideo,
}: ProjectCardProps) {
  return (
    <Card className='group overflow-hidden border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card/80 hover:shadow-lg max-w-md'>
      <div className='relative overflow-hidden'>
        <div className='aspect-video relative bg-muted/30'>
          <Image
            src={image || '/placeholder.svg'}
            alt={title}
            fill
            className='object-cover transition-transform duration-300 my-0 mx-0 not-prose'
          />
          {isVideo && (
            <div className='absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
              <Button
                size='icon'
                variant='secondary'
                className='h-12 w-12 rounded-full'>
                <Play className='h-5 w-5 ml-0.5' />
              </Button>
            </div>
          )}
        </div>
      </div>

      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between gap-2'>
          <div className='space-y-1'>
            <CardTitle className='text-lg font-semibold leading-tight text-foreground'>
              {title}
            </CardTitle>
          </div>
          <div className='flex gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
            {githubUrl && (
              <Button size='icon' variant='ghost' className='h-8 w-8' asChild>
                <a href={githubUrl} target='_blank' rel='noopener noreferrer'>
                  <Github className='h-4 w-4' />
                  <span className='sr-only'>View on GitHub</span>
                </a>
              </Button>
            )}
            {liveUrl && (
              <Button size='icon' variant='ghost' className='h-8 w-8' asChild>
                <a href={liveUrl} target='_blank' rel='noopener noreferrer'>
                  <ExternalLink className='h-4 w-4' />
                  <span className='sr-only'>View live demo</span>
                </a>
              </Button>
            )}
          </div>
        </div>
        <CardDescription className='text-sm text-muted-foreground leading-relaxed'>
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className='pt-0'>
        <div className='space-y-3'>
          <div>
            <h4 className='text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2'>
              Tech Stack
            </h4>
            <div className='flex flex-wrap gap-1.5'>
              {techStack.map(tech => (
                <Badge
                  key={tech}
                  variant='secondary'
                  className='text-xs px-2 py-0.5 bg-muted/50 text-muted-foreground border-border/50 hover:bg-muted/80 transition-colors'>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
