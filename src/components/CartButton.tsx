import { useState, useEffect } from 'react';
import { Button } from './button';
import { Badge } from './badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from './sheet';
import { $cart, $isCartDrawerOpen, initCart } from '@/stores/cart';
import { useStore } from '@nanostores/react';
import { useUserAgent } from './contexts';
import { z } from 'zod';
import { shortcutPressedHandler, type Shortcut } from '@/utils/shortcuts';
import { ShortcutBadge } from './ShortcutBadge';
import { SideNavItemIcon } from './SideNavItemIcon';

interface Props {
  buyerIP: string;
}

const cartShortcut: z.infer<typeof Shortcut> = {
  metaKey: true,
  key: 'j',
};

export function CartButton({ buyerIP }: Props) {
  const [isInitialized, setIsInitialized] = useState(false);
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
      shortcutPressedHandler(e, cartShortcut, () => $isCartDrawerOpen.set(true));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div>
      <div className="text-primary flex gap-4 xl:justify-between">
        <div className="hover:text-secondary flex cursor-pointer gap-4" onClick={() => $isCartDrawerOpen.set(true)}>
          <SideNavItemIcon icon="CART" />
          <button type="button" className="hidden cursor-pointer xl:block">
            cart
          </button>
        </div>
        <div className="hidden md:block">
          <ShortcutBadge shortcut={cartShortcut} />
        </div>
      </div>
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
