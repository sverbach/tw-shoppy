import { CartResult } from '../schemas';
import { makeShopifyRequest } from './core';
import { CreateCartMutation, AddCartLinesMutation, GetCartQuery, RemoveCartLinesMutation } from '../graphql';

// Create a cart and add a line item to it and return the cart object
export const createCart = async (id: string, quantity: number) => {
  const data = await makeShopifyRequest(CreateCartMutation, { id, quantity });
  const { cartCreate } = data;
  const { cart } = cartCreate;
  const parsedCart = CartResult.parse(cart);

  return parsedCart;
};

// Add a line item to an existing cart (by ID) and return the updated cart object
export const addCartLines = async (id: string, merchandiseId: string, quantity: number) => {
  const data = await makeShopifyRequest(AddCartLinesMutation, {
    cartId: id,
    merchandiseId,
    quantity,
  });
  const { cartLinesAdd } = data;
  const { cart } = cartLinesAdd;

  const parsedCart = CartResult.parse(cart);

  return parsedCart;
};

// Remove line items from an existing cart (by IDs) and return the updated cart object
export const removeCartLines = async (id: string, lineIds: string[]) => {
  const data = await makeShopifyRequest(RemoveCartLinesMutation, {
    cartId: id,
    lineIds,
  });
  const { cartLinesRemove } = data;
  const { cart } = cartLinesRemove;
  const parsedCart = CartResult.parse(cart);

  return parsedCart;
};

// Get a cart by its ID and return the cart object
export const getCart = async (id: string) => {
  const data = await makeShopifyRequest(GetCartQuery, { id });

  const { cart } = data;
  const parsedCart = CartResult.parse(cart);

  return parsedCart;
};
