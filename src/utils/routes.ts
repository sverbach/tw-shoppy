import { z } from 'zod';

export const PageRoute = z.object({
  link: z.string(),
  title: z.string(),
  children: z
    .array(
      z.object({
        link: z.string(),
        title: z.string(),
      })
    )
    .optional(),
});

export const PageRoutes = z.array(PageRoute);

export const routes: z.infer<typeof PageRoutes> = [
  {
    link: '/cases',
    title: 'cases',
  },
  {
    link: '/switches',
    title: 'switches',
    children: [
      {
        link: '/mech-switches',
        title: 'mechanical switches',
      },
      {
        link: '/he-switches',
        title: 'hall effect switches',
      },
    ],
  },
  {
    link: '/keycaps',
    title: 'keycaps',
  },
  {
    link: '/accessoirs',
    title: 'accessoirs',
  },
];
