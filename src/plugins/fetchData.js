import axios from "axios"
import { setProducts } from "../data/productsReducer"

export default async function fetchAPI(dispatch) {
    await axios.get('https://fakestoreapi.com/products').then(res => {
      res.data.forEach(item => {
        item.quantity = 20
      })
      dispatch(setProducts(res.data))
    }).then(() => {
        return false
    }).catch(err => {
        throw new Error(err)
    })
}