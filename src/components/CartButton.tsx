import { useState } from 'react';
import { Button } from './button';
import { Badge } from './badge';

interface Props {
  buyerIP: string;
}

export function CartButton({ buyerIP }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" onClick={() => setSearchOpen(!searchOpen)}>
        Cart <Badge variant="outline">CTRL+C</Badge>
      </Button>
    </>
  );
}
