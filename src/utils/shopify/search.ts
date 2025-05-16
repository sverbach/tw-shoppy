import { PredictiveSearchResult } from '../schemas';
import { makeShopifyRequest } from './core';
import { PredictiveSearchQuery } from '../graphql';

export const predictiveSearch = async (options: { buyerIP: string; query: string }) => {
  const { buyerIP, query } = options;
  const data = await makeShopifyRequest(PredictiveSearchQuery, { query }, buyerIP);

  return PredictiveSearchResult.parse(data.predictiveSearch);
};
