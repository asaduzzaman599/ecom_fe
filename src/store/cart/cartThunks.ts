import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { setCartDetails } from "./cartSlice";
import { StockDetails } from "@/composable/products";
import useApi from "@/composable/api";

export const fetchCartDetailsAction = createAsyncThunk(
  "cart/fetchCartDetails",
  async (_, 
    { getState, dispatch }) => {
        
            const api = useApi()

    const state = getState() as RootState;
    const items = state.cart.items;

    if (!items.length) {
      dispatch(setCartDetails({ total: 0, items: [] }));
      return;
    }

    const cartItems = items.map(i => ({
      stockId: i.stockId,
      qty: i.quantity
    }));

    const data = await api<StockDetails>(
      "/stocks/carts",
      "POST",
      { data: { cartItems } }
    );
    
    if (data) {
      dispatch(setCartDetails(data));
    }
  }
);
