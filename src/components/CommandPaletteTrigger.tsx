import { useEffect, useState } from 'react';
import { CommandDialog, CommandGroup, CommandInput, CommandItem, CommandList } from './command';
import { CommandEmpty } from 'cmdk';
import { useCommand, useUserAgent } from './contexts';
import { Button } from './button';
import { Badge } from './badge';

interface Props {}

export function CommandPaletteTrigger({}: Props) {
  const [cmdOpen, setCmdOpen] = useState(false);
  const { userAgent } = useUserAgent();
  const { command, setCommand } = useCommand();

  // spawn the cmdk dialog when user presses "CTRL+SHIFT+P"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setCmdOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCmdOpen]);

  function toggleDanceEmote() {
    setCommand(command === 'dance' ? 'none' : 'dance');
  }

  return (
    <>
      <Button variant="ghost" onClick={() => setCmdOpen(!cmdOpen)}>
        Other <Badge variant="outline">{userAgent === 'mac' ? '⌘' : 'CTRL'}+Shift+P</Badge>
      </Button>
      <CommandDialog open={cmdOpen} onOpenChange={(open) => setCmdOpen(open)} shouldFilter={true}>
        <CommandInput placeholder="Search for a command..." />
        <CommandList>
          <CommandEmpty>Command not found :(</CommandEmpty>
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                setCmdOpen(false);
                toggleDanceEmote();
              }}
            >
              <span>Emote: dance ({command === 'dance' ? 'active' : 'inactive'})</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
