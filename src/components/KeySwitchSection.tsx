import { z } from 'zod';
import { ProductFilters, ProductResult } from '@/utils/schemas';
import { FilterProvider } from './ProductsFilterContext';
import { Filters } from './Filters';
import { KeySwitchItemList } from './KeySwitchItemList';

const ProductsResult = z.array(ProductResult);
export interface Props {
  products: z.infer<typeof ProductsResult>;
  filters: z.infer<typeof ProductFilters>;
  buyerIP: string;
}

function KeySwitchSection({ products, filters, buyerIP }: Props) {
  return (
    <FilterProvider>
      <Filters filters={filters} />
      <KeySwitchItemList initialProducts={products} buyerIP={buyerIP} />
    </FilterProvider>
  );
}

export { KeySwitchSection };
