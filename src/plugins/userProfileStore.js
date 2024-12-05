import { jwtDecode } from "jwt-decode"
import axios from "axios"
import { setNameUser, setEmailUser } from "../data/userReducer"

export default async function setUserProfileStore(token, dispatch) {
    try {
        const getUser = jwtDecode(token)
        const id = getUser.sub
        const { data } = await axios.get(`https://fakestoreapi.com/users/${id}`)
        dispatch(setNameUser(`${data.name.firstname} ${data.name.lastname}`))
        dispatch(setEmailUser(data.email))    
    } catch (error) {
        throw new Error(error)    
    }
    
}