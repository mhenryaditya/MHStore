import { Card } from "flowbite-react";
import StarRating from "./StarRating";
import { Link, useNavigate } from "react-router-dom";
import processCart from "./setCart";
import { useSelector } from "react-redux";

function NewCard({ product }) {
    let data = useSelector(state => state)
    let navigate = useNavigate()

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
                    <button onClick={() => processCart(product, data, undefined, navigate)} className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">Add to cart</button>
                </div>
            </div>
        </Card>
    )
}

export default NewCard