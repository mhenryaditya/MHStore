import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { Breadcrumb } from "flowbite-react";
import Alert from "../components/Alert";
import { HiHome } from "react-icons/hi";
import { setProducts } from "../data/productsReducer";
import toast from "react-hot-toast";

function Cart() {
    let data = useSelector(state => state)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [myCart, setMyCart] = useState([])
    let [isLoading, setLoading] = useState(true)
    let [isLostCon, setLostCon] = useState(false)

    let handleInput = (e, i) => {
        let dataCart = [...myCart]
        let index = dataCart.findIndex(item => item.id === i)
        if (index !== -1) {
            dataCart[index].quantity = Number(e.target.value)
            setMyCart(dataCart)
            localStorage.setItem('cart', JSON.stringify(dataCart))
        }
    }

    let increment = (i) => {
        let dataCart = [...myCart]
        let index = dataCart.findIndex(item => item.id === i)
        if (index !== -1) {
            dataCart[index].quantity += 1
            setMyCart(dataCart)
            localStorage.setItem('cart', JSON.stringify(dataCart))
        }
    }

    let decrement = (i) => {
        let dataCart = [...myCart]
        let index = dataCart.findIndex(item => item.id === i)
        if (index !== -1 && dataCart[index].quantity > 1) {
            dataCart[index].quantity -= 1
            setMyCart(dataCart)
            localStorage.setItem('cart', JSON.stringify(dataCart))
        }
    }

    let deleteItem = (i) => {
        let dataCart = [...myCart]
        let index = dataCart.findIndex(item => item.id === i)
        if (index !== -1) {
            dataCart.splice(index, 1)
            setMyCart(dataCart)
            localStorage.setItem('cart', JSON.stringify(dataCart))
        }
        
    }

    let checkOut = () => {
        let dataProducts = data.products.map(product => ({ ...product }))
        let dataCart = [...myCart]
        dataCart.forEach(item => {
            if (item.quantity <= dataProducts.find(product => product.id === item.id).quantity) {
                let index = dataProducts.findIndex(product => product.id === item.id)
                if (index !== -1) {
                    dataProducts[index].quantity -= item.quantity
                }
            }
        })
        dispatch(setProducts(dataProducts))
        localStorage.removeItem('cart')
        toast.success('Checkout product successfully')
        navigate('/')
    }

    let totalPrice = myCart.reduce((total, item) => {
        const product = Object.entries(data.products).find(([_, p]) => p.id === item.id)?.[1]
        return total + product.price * item.quantity
    }, 0)

    useEffect(() => {
        if (data.user.nameUser === null) {
            navigate('/')
        }
        let cart = localStorage.getItem('cart') 
        if (cart) {
            setMyCart(JSON.parse(cart))
        }

        setLoading(false)
    }, [data.user.nameUser, navigate])

    return (
        <>
            <Header pageActive="cart" />
            {isLoading ? (
                <div className="flex justify-center mt-32">
                <Loading />
                </div>
            ) : (
                <div className="mb-20">
                    <div className="max-w-screen-xl mx-auto px-4 mt-20">
                        {!isLostCon ? (
                            <div className="mb-10">
                                <Breadcrumb className="bg-gray-50 py-3 dark:bg-gray-800">
                                    <Breadcrumb.Item icon={HiHome}><Link to="/">Home</Link></Breadcrumb.Item>    
                                    <Breadcrumb.Item>My Cart</Breadcrumb.Item>    
                                </Breadcrumb>
                                <h2 className="font-semibold text-[20pt] my-3">My Cart</h2>
                                <div className="h-48 sm:h-64 xl:h-64 2xl:h-80 my-3">
                                    {/* Tabel */}
                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-16 py-3">
                                                        Image
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Product
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Price
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Qty
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Total
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {myCart.length > 0 ? (myCart.map((val) => (
                                                    <tr key={val.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td className="p-4 flex justify-center">
                                                            <img src={Object.entries(data.products).find(item => item[1].id == val.id)[1].image} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                                                        </td>
                                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                            {Object.entries(data.products).find(item => item[1].id == val.id)[1].title}
                                                            {val.quantity > Object.entries(data.products).find(item => item[1].id == val.id)[1].quantity ? (
                                                                <p className="text-red-500">The quantity is not allowed</p>) : ('')}
                                                        </td>
                                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                            ${Object.entries(data.products).find(item => item[1].id == val.id)[1].price}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center">
                                                                <button onClick={() => decrement(val.id)} className={`${Number(val.quantity) === 1 ? 'hidden': ''}  inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`} type="button">
                                                                    <span className="sr-only">Quantity button</span>
                                                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                                                    </svg>
                                                                </button>
                                                                <div>
                                                                    <input type="number" min="1" onChange={e => handleInput(e, val.id)} value={Number(val.quantity)} id="first_product" className="text-center bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
                                                                </div>
                                                                <button onClick={() => increment(val.id)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                                    <span className="sr-only">Quantity button</span>
                                                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                            ${Number(Number(Object.entries(data.products).find(item => item[1].id == val.id)[1].price) * Number(val.quantity)).toFixed(2)}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button type="button" onClick={() => deleteItem(val.id)} className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))) : (
                                                    <tr>
                                                        <td colSpan="6" className="p-4 text-center"><p>You're cart is empty</p></td>
                                                    </tr>
                                                )}
                                            </tbody>
                                            {myCart.length > 0 ? (
                                                <tfoot>
                                                    <tr className="font-semibold text-gray-900 dark:text-white">
                                                        <td className="px-6 py-3"></td>
                                                        <th scope="row" colSpan="3" className="px-6 py-3 text-base">Total</th>
                                                        <td className="px-6 py-3">${totalPrice.toFixed(2)}</td>
                                                    </tr>
                                                </tfoot>) : ('')}                                                
                                        </table>
                                    </div>
                                        {myCart.length > 0 ? (
                                            <div className="mt-5 flex justify-end pb-20">
                                                <button type="button" onClick={checkOut} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Checkout</button>
                                            </div>
                                        ) : ('')}

                                </div>
                            </div>
                        ) : (
                            <div className="mt-24">
                                <Alert type='error' message='Your connection is lost. Please try again.' />
                            </div>
                        )}
                    </div>   
                </div>
            ) }
        </>
    )
}

export default Cart;