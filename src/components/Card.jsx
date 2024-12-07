import { Card } from "flowbite-react";
import StarRating from "./StarRating";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import refreshCount from "../plugins/cartCountStore";

function NewCard({ product }) {
    let data = useSelector(state => state)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let processCart = (productContent, count = 1) => {
        if (data.user.nameUser !== null) {
            let tempCart = []
            let isSame = false
            let cart = localStorage.getItem("cart")
            if (cart) {
                cart = JSON.parse(cart)
                cart.forEach((item) => {
                    if (item.id === productContent.id) {
                        item.quantity += count
                        isSame = true
                    }
                    tempCart.push(item)
                })
                if (!isSame) {
                    tempCart.push({
                        id: productContent.id,
                        quantity: count,
                    })
                }
            } else {
                tempCart.push({
                    id: productContent.id,
                    quantity: count,
                })
            }
                
            localStorage.setItem("cart", JSON.stringify(tempCart))
            toast.success('Product has been added to your cart successfully!')
        } else {
            toast('You need login to add product to your cart', {
                icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
                )
            })
            navigate('/login')
        }
        refreshCount(dispatch)
    }

    return (
        <Card className="w-[300px] flex-grow shadow-lg">
            <div className="flex-grow flex justify-center">
                <img className="self-center" width={200} src={product.image} alt={product.id} />
            </div>
            <div className="h-fit">
                <span className="w-fit rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800 block">{ product.category }</span>
                <Link to={`/detail/${product.id}`}>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{ product.title }</h5>
                </Link>
                <p className="text-md font-normal text-gray-500 dark:text-gray-400 mb-6 mt-1">Availability Stock: { product.quantity }</p>
                <div className="mb-5 mt-2.5 flex items-center">
                    <StarRating rating={product.rating.rate} />
                    <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">{ product.rating.rate }</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${ product.price }</span>
                    <button onClick={() => processCart(product)} className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">Add to cart</button>
                </div>
            </div>
        </Card>
    )
}

export default NewCard