import { setCount } from "../data/cartCount"

export default function refreshCount(dispatch) {
    let countCart = JSON.parse(localStorage.getItem('cart')).length
    dispatch(setCount(countCart))
}