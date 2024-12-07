import axios from "axios"
import { setProducts } from "../data/productsReducer"

export default async function fetchAPI(dispatch) {
  try {
    const res = await axios.get('https://fakestoreapi.com/products')
    const products = res.data.map(product => ({
      ...product,
      quantity: 20,
    }))
    dispatch(setProducts(products))
    return true
  } catch (error) {
    throw new Error(error)
  }
}