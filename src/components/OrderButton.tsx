import { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';

interface Props {
  buyerIP: string;
}

export function OrderButton({ buyerIP }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" onClick={() => setSearchOpen(!searchOpen)}>
        Orders <Badge variant="outline">CTRL+O</Badge>
      </Button>
    </>
  );
}
