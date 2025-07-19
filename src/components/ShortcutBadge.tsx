import type { z } from 'zod';
import { Badge } from './badge';
import type { Shortcut } from '@/utils/shortcuts';
import { getUserAgent } from '@/utils/user-agent';
import { useEffect, useState } from 'react';

export interface Props {
  shortcut: z.infer<typeof Shortcut>;
}
export function ShortcutBadge({ shortcut }: Props) {
  const [keysDisplay, setKeysDisplay] = useState('');
  useEffect(() => {
    const userAgent = getUserAgent();
    const letterDisplay = shortcut.key.toUpperCase();
    const altKeyDisplay = shortcut.altKey ? 'ALT' : undefined;
    const metaKeyDisplay = shortcut.metaKey ? (userAgent === 'mac' ? '⌘' : 'CTRL') : undefined;

    const keys = [metaKeyDisplay, altKeyDisplay, letterDisplay].filter((key) => !!key);
    setKeysDisplay(keys.join('+'));
  }, []);

  return <>{keysDisplay === '' ? <div></div> : <Badge variant="outline">{keysDisplay}</Badge>}</>;
}
