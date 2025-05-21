import { useEffect, useState } from 'react';
import { Button } from './button';
import { Badge } from './badge';
import { CommandDialog, CommandEmpty, CommandInput, CommandList } from './command';

interface Props {
  buyerIP: string;
}

export function OrderButton({ buyerIP }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchOrderText, setSearchOrderText] = useState('');

  const handleOpenChange = (open: boolean) => {
    setSearchOpen(open);
  };

  // spawn the cmdk dialog when user presses "CTRL+J"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  return (
    <>
      <Button variant="ghost" onClick={() => setSearchOpen(!searchOpen)}>
        Orders <Badge variant="outline">CTRL+J</Badge>
      </Button>
      <CommandDialog open={searchOpen} onOpenChange={handleOpenChange} shouldFilter={false}>
        <CommandInput placeholder="Please enter the order id, i.e. O-3291843" onValueChange={(value) => setSearchOrderText(value)} />
        <CommandList>
          <CommandEmpty>Order not found.</CommandEmpty>
        </CommandList>
      </CommandDialog>
    </>
  );
}
