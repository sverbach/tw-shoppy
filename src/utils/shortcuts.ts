import { z } from 'zod';

export const Shortcut = z.object({
  tabKey: z.boolean().optional(),
  altKey: z.boolean().optional(),
  metaKey: z.boolean().optional(),
  key: z.string(),
});

export function shortcutPressedHandler(e: KeyboardEvent, shortcut: z.infer<typeof Shortcut>, handler: () => any) {
  if (
    ((shortcut.metaKey && (e.ctrlKey || e.metaKey)) || (shortcut.altKey && e.altKey)) &&
    e.key.toLowerCase() === shortcut.key.toLowerCase()
  ) {
    e.preventDefault();
    handler();
  }
}
