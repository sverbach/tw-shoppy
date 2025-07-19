import { PageRouteIcon } from '@/utils/routes';
import { Box, Cuboid, Keyboard, Search, ShoppingCart } from 'lucide-react';
import { z } from 'zod';

const UserActionIcon = z.enum(['SEARCH', 'CART']);
type PageRouteIconType = z.infer<typeof PageRouteIcon>;
type UserActionIconType = z.infer<typeof UserActionIcon>;

interface Props {
  icon: PageRouteIconType | UserActionIconType;
}

const IconMap = {
  [PageRouteIcon.Enum.KEYCAPS]: <Cuboid />,
  [PageRouteIcon.Enum.SWITCHES]: <Box />,
  [PageRouteIcon.Enum.ACCESSOIRS]: <Keyboard />,
  [UserActionIcon.Enum.SEARCH]: <Search />,
  [UserActionIcon.enum.CART]: <ShoppingCart />,
};

export function SideNavItemIcon({ icon }: Props) {
  return <>{IconMap[icon]}</>;
}
