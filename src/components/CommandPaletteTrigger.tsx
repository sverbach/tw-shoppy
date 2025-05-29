import { CommandEmpty } from 'cmdk';
import { useEffect, useState } from 'react';
import { CommandDialog, CommandGroup, CommandInput, CommandItem, CommandList } from './command';
import { useCommand } from './contexts';

interface Props {}

export function CommandPaletteTrigger({}: Props) {
  const [cmdOpen, setCmdOpen] = useState(false);
  const { command, setCommand } = useCommand();

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
