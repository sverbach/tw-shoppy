import { useState, useEffect } from 'react';
import { Button } from './button';
import { Badge } from './badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './sheet';

interface Props {
  buyerIP: string;
}

export function CartButton({ buyerIP }: Props) {
  const [searchOpen, setSidebarOpen] = useState(false);

  // spawn the cmdk dialog when user presses "CTRL+L"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setSidebarOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSidebarOpen]);

  return (
    <>
      <Button variant="ghost" onClick={() => setSidebarOpen(!searchOpen)}>
        Cart <Badge variant="outline">CTRL+L</Badge>
      </Button>
      <Sheet open={searchOpen} onOpenChange={setSidebarOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>This is my cart :)</SheetTitle>
            <SheetDescription>wowieeeeeeeeeeee</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
