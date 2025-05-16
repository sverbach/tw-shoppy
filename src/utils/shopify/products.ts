import { z } from 'zod';
import { ProductResult, Sort, SortKey, FiltersResult } from '../schemas';
import { makeShopifyRequest } from './core';
import {
  ProductsQuery,
  ProductByHandleQuery,
  ProductRecommendationsQuery,
  GetFiltersQuery,
} from '../graphql';

// Get all products or a limited number of products (default: 50)
export const getProducts = async (options: {
  limit?: number;
  buyerIP: string;
  sort?: z.infer<typeof Sort>;
  filters?: string[];
}) => {
  const {
    limit = 50,
    buyerIP,
    sort = {
      key: SortKey.Enum.BEST_SELLING,
      ascending: true,
    },
    filters = [],
  } = options;

  const data = await makeShopifyRequest(
    ProductsQuery,
    {
      first: limit,
      filters: filters.map((filter) => JSON.parse(filter)),
      sortKey: sort.key,
      reverse: !sort.ascending,
    },
    buyerIP
  );
  const {
    collection: { products },
  } = data;

  if (!products) {
    throw new Error('No products found');
  }

  const productsList = products.edges.map((edge: any) => edge.node);
  const ProductsResult = z.array(ProductResult);
  const parsedProducts = ProductsResult.parse(productsList);

  return parsedProducts;
};

// Get a product by its handle (slug)
export const getProductByHandle = async (options: { handle: string; buyerIP: string }) => {
  const { handle, buyerIP } = options;

  const data = await makeShopifyRequest(ProductByHandleQuery, { handle }, buyerIP);
  const { product } = data;

  const parsedProduct = ProductResult.parse(product);

  return parsedProduct;
};

export const getProductRecommendations = async (options: { productId: string; buyerIP: string }) => {
  const { productId, buyerIP } = options;
  const data = await makeShopifyRequest(
    ProductRecommendationsQuery,
    {
      productId,
    },
    buyerIP
  );
  const { productRecommendations } = data;

  const ProductsResult = z.array(ProductResult);
  const parsedProducts = ProductsResult.parse(productRecommendations);

  return parsedProducts;
};

export const getProductFilters = async (options: { buyerIP: string; filters?: string[] }) => {
  const { buyerIP, filters = [] } = options;
  const data = await makeShopifyRequest(
    GetFiltersQuery,
    { filters: filters.map((filter) => JSON.parse(filter)) },
    buyerIP
  );

  return FiltersResult.parse(data).collection.products.filters;
};
