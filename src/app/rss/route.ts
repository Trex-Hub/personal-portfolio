import { Feed } from 'feed';
import { source } from '@/lib/source';
import { NextResponse } from 'next/server';
import { getYear } from 'date-fns';
import { BASE_URL as baseUrl } from '@/lib/constant';

export const revalidate = false;

const year = getYear(new Date());

export function GET() {
  const feed = new Feed({
    title: "Devendra's Portfolio",
    id: `${baseUrl}/`,
    link: `${baseUrl}/`,
    language: 'en',
    copyright: `All rights reserved ${year}, Devendra`,
    image: `${baseUrl}/banner.webp`,
    favicon: `${baseUrl}/icon.png`,
  });

  for (const page of source.getPages()) {
    feed.addItem({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      link: `${baseUrl}${page.url}`,
      date: new Date(),
      author: [
        {
          name: 'Devendra Mishra',
        },
      ],
    });
  }

  return new NextResponse(feed.rss2());
}
