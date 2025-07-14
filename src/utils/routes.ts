import { z } from 'zod';
import { Shortcut } from './shortcuts';

export const PageRouteIcon = z.enum(['KEYCAPS', 'SWITCHES', 'ACCESSOIRS']);
export const PageRoute = z.object({
  link: z.string(),
  title: z.string(),
  icon: PageRouteIcon,
  shortcut: Shortcut,
});

export const PageRoutes = z.array(PageRoute);

export const routes: z.infer<typeof PageRoutes> = [
  {
    link: '/keycaps',
    title: 'keycaps',
    icon: 'KEYCAPS',
    shortcut: {
      altKey: true,
      key: 'j',
    },
  },
  {
    link: '/switches',
    title: 'switches',
    icon: 'SWITCHES',
    shortcut: {
      altKey: true,
      key: 'k',
    },
  },
  {
    link: '/accessoirs',
    title: 'accessoirs',
    icon: 'ACCESSOIRS',
    shortcut: {
      altKey: true,
      key: 'l',
    },
  },
];
