import type { Sort } from '@/utils/schemas';
import type { z } from 'astro:content';
import lz from 'lz-string';

export function encodeSort(sort: z.infer<typeof Sort>) {
  return lz.compressToEncodedURIComponent(JSON.stringify(sort));
}

export function decodeSort(encoded: string) {
  return lz.decompressFromEncodedURIComponent(encoded);
}

export function encodeFilters(filters: string[]) {
  const minified = replaceAllJsonObjectKeys(filters, minifiedKeysLookupTable);

  return lz.compressToEncodedURIComponent(JSON.stringify(minified));
}

export function decodeFilters(encoded: string) {
  try {
    const decompressed = lz.decompressFromEncodedURIComponent(encoded);
    return replaceAllJsonObjectKeys(JSON.parse(decompressed), unMinifiedKeysLookupTable);
  } catch {
    return '';
  }
}

const minifiedKeysLookupTable = {
  productMetafield: 'pM',
  taxonomyMetafield: 'tM',
  namespace: 'n_',
  switch: 'sw',
  key: 'k',
  value: 'v',
  total_travel: 'tt',
  pre_travel: 'pt',
  operating_force: 'op',
  pre_lubed: 'pl',
  led_support: 'ls',
  pcb_mount: 'pm',
};

// just the reverse of minifiedLookupTable
const unMinifiedKeysLookupTable = Object.fromEntries(
  Object.entries(minifiedKeysLookupTable).map(([key, value]) => [value, key])
);

function replaceAllJsonObjectKeys(filters: string[], minifiedKeysLookupTable: Record<string, string>) {
  const keysToMinify = Object.keys(minifiedKeysLookupTable) as (keyof typeof minifiedKeysLookupTable)[];
  return filters.map((filter) => {
    let minifiedFilter = filter;
    for (let verboseKey of keysToMinify) {
      minifiedFilter = minifiedFilter.replaceAll(
        `"${verboseKey}"`,
        `"${minifiedKeysLookupTable[verboseKey]}"`
      );
    }

    return minifiedFilter;
  });
}
