// FUMADOCS
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import defaultComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
// COMPONENTS
import { IconCloud } from '@/components/molecules/cloud';
import { Safari } from '@/components/molecules/safari';
import { Device } from '@/components/organisms/device';
import { Iphone15Pro } from '@/components/molecules/iphone';
import ProjectCard from '@/components/molecules/project-card';
import Timeline from '@/components/molecules/timeline';
import MinimalCard from '@/components/organisms/minimal-card';
import { Timeline as CareerTimeline } from '@/components/organisms/timeline/timeline';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    img: props => <ImageZoom {...(props as any)} />,
    ...components,
    Cloud: props => <IconCloud {...(props as any)} />,
    Safari: props => <Safari {...(props as any)} />,
    Iphone15Pro: props => <Iphone15Pro {...(props as any)} />,
    Device: props => <Device {...(props as any)} />,
    ProjectCard: props => <ProjectCard {...(props as any)} />,
    Timeline: props => <Timeline {...(props as any)} />,
    MinimalCard: props => <MinimalCard {...(props as any)} />,
    CareerTimeline: props => <CareerTimeline {...(props as any)} />,
  };
}
