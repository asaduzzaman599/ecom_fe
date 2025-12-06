import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type CartStock = {
                id: string,
                size: string
                color: string
                description: string
                quantity: number
                damageQty: number
                imageIds: string[]
                createdAt: string
                updatedAt: string
                deleted: boolean
                isActive: boolean
                goodId: string
                good: CartProduct
            }
            
            
            
export type CartProduct = {
                    price: number
                    title: string
                    description: string
                }

                export type CartItem = {
  stockId: string;
  quantity: number;
  
};

export type CartItemDetail = {
            stock: CartStock
            total: number
            quantity: number
        };

export type CartDetails = {
  total: number
    items: CartItemDetail[]
  }

export type CartState = {
  items: CartItem[];
  details?: CartDetails
};

const LOCAL_KEY = "cart-data";

// ---------- Load From LocalStorage ----------
function loadCartFromLocalStorage(): CartState {
  try {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (!saved) return { items: [] };

    return JSON.parse(saved) as CartState;
  } catch (e) {
    return { items: [] };
  }
}

// ---------- Save To LocalStorage ----------
function saveCartToLocalStorage(state: CartState) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
}

// ---------- Initial State ----------
const initialState: CartState = { items: [] };

// ---------- Slice ----------
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initCart: (state) =>{
      const saved = loadCartFromLocalStorage()
      return saved
    },
    setCartDetails: (
      state, action: PayloadAction<CartDetails>
    )=>{
      state.details = action.payload
    },
    addToCart: (
      state,
      action: PayloadAction<{ stockId: string; quantity?: number }>
    ) => {
      const { stockId, quantity = 1 } = action.payload;

      const existing = state.items.find((i) => i.stockId === stockId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ stockId, quantity });
      }

      saveCartToLocalStorage(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.stockId !== action.payload
      );

      saveCartToLocalStorage(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ stockId: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (i) => i.stockId === action.payload.stockId
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }

      saveCartToLocalStorage(state);
    },

    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  initCart,
  setCartDetails
} = cartSlice.actions;

export default cartSlice.reducer;