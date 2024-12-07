import { setCount } from "../data/cartCount"

export default function refreshCount(dispatch) {
    if (localStorage.getItem('cart')) {
        let countCart = JSON.parse(localStorage.getItem('cart')).length
        dispatch(setCount(countCart))    
    }
}