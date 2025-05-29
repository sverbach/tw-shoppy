import { useState, useEffect } from 'react';
import { Button } from './button';
import { Badge } from './badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from './sheet';
import { $cart, $isCartDrawerOpen, initCart } from '@/stores/cart';
import { useStore } from '@nanostores/react';
import { useUserAgent } from './contexts';

interface Props {
  buyerIP: string;
}

export function CartButton({ buyerIP }: Props) {
  const [isInitialized, setIsInitialized] = useState(false);
  const { userAgent } = useUserAgent();
  const cart = useStore($cart);
  const open = useStore($isCartDrawerOpen);

  // init cart
  useEffect(() => {
    const initialize = async () => {
      await initCart();
      setIsInitialized(true);
    };

    initialize();
  }, []);

  // spawn the cmdk dialog when user presses "CTRL+L"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        $isCartDrawerOpen.set(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div>
      <Button variant="ghost" onClick={() => $isCartDrawerOpen.set(!open)} disabled={!isInitialized}>
        Cart <Badge variant="outline">{userAgent === 'mac' ? '⌘' : 'CTRL'}+L</Badge>
      </Button>
      <Sheet open={open} onOpenChange={(openChange) => $isCartDrawerOpen.set(openChange)}>
        <SheetContent>
          <SheetHeader>
            {!!cart?.id ? <SheetTitle>Your cart</SheetTitle> : <SheetTitle>Your cart is empty whomp whomp</SheetTitle>}
          </SheetHeader>
          {cart?.id && (
            <>
              <ul>
                {cart?.lines.nodes.map((node) => (
                  <li key={node.id}>
                    {node.merchandise.product.title}, {node.quantity}
                  </li>
                ))}
              </ul>
              <Button onClick={() => (window.location.href = cart.checkoutUrl)}>Go to checkout bro</Button>
            </>
          )}
        </SheetContent>
        <SheetFooter></SheetFooter>
      </Sheet>
    </div>
  );
}
