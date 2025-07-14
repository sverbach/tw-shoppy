import type { PageRoute } from '@/utils/routes';
import { shortcutPressedHandler } from '@/utils/shortcuts';
import { useEffect } from 'react';
import type { z } from 'zod';

interface Props {
  route: z.infer<typeof PageRoute>;
}

export function RouteShortcut({ route }: Props) {
  const { shortcut } = route;
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      shortcutPressedHandler(e, shortcut, () => (window.location.href = route.link));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return <></>;
}
