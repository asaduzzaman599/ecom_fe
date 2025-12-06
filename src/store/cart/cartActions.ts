import { addToCart, CartDetails, initCart, removeFromCart, updateQuantity, setCartDetails } from "./cartSlice"
import { fetchCartDetailsAction } from "./cartThunks"
import { useAppDispatch } from "../useAppDispatch"
import useApi from "@/composable/api"

export const useCartAction = () =>{
    const dispatch = useAppDispatch()
    const api = useApi()

    const addItemToCart = (stockId: string, quantity: number)=>{
        return dispatch(addToCart({stockId, quantity}))
    }
    const updateItemToCart = (stockId: string, quantity: number)=>{
        return dispatch(updateQuantity({ stockId, quantity }));
    }

    const removeItemFromCart = (stockId: string) => dispatch(removeFromCart(stockId));
    const setCart = ()=> dispatch(initCart())
    const setDetailsCart = (details: CartDetails)=> {
        dispatch(setCartDetails(details))
    }

    const fetchCartDetails = ()=> dispatch(fetchCartDetailsAction())


    return {
        addItemToCart,
        removeItemFromCart,
        updateItemToCart,
        setCart,
        setDetailsCart,
        fetchCartDetails
    }

}