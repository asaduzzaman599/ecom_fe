import { useDispatch } from "react-redux"
import { addToCart, initCart, removeFromCart, updateQuantity } from "../slice/cartSlice"

export const useCart = () =>{
    const dispatch = useDispatch()

    const addItemToCart = (stockId: string, quantity: number)=>{
        return dispatch(addToCart({stockId, quantity}))
    }
    const updateItemToCart = (stockId: string, quantity: number)=>{
        return dispatch(updateQuantity({ stockId, quantity }));
    }

    const removeItemFromCart = (stockId: string) => dispatch(removeFromCart(stockId));
    const setCart = ()=> dispatch(initCart())


    return {
        addItemToCart,
        removeItemFromCart,
        updateItemToCart,
        setCart
    }

}