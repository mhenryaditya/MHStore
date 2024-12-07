import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Products from "../components/Products";
import fetchAPI from "../plugins/fetchData";
import Alert from "../components/Alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import toast from "react-hot-toast";
import refreshCount from "../plugins/cartCountStore";

function DetailProduct() {
    let data = useSelector((state) => state)
    let [isLoading, setLoading] = useState(true)
    let [isLostCon, setLostCon] = useState(false)
    let [product, setProduct] = useState({})
    let [productCount, setProductCount] = useState(1)
    let id = useParams().id
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let initialise = async () => {
        if (data.products.length === 0) {
            try {
                await fetchAPI(dispatch)
            } catch (error) {
                setLoading(false)
                setLostCon(true)
            }
        }
        let findData = data.products.find((item) => item.id == id)
        
        if (findData) {
            setProduct(findData)
        }

        setLoading(false)
        
    }

    let handleInput = (e) => {
        setProductCount(Math.max(1, Number(e.target.value)))
    }

    useEffect(() => {
        initialise()
    }, [data.products, fetchAPI, dispatch, id])

    let processCart = (productContent) => {
        if (data.user.nameUser !== null) {
            let tempCart = []
            let isSame = false
            let cart = localStorage.getItem("cart")
            if (cart) {
                cart = JSON.parse(cart)
                cart.forEach((item) => {
                    if (item.id === productContent.id) {
                        item.quantity += productCount
                        isSame = true
                    }
                    tempCart.push(item)
                })
                if (!isSame) {
                    tempCart.push({
                        id: productContent.id,
                        quantity: productCount,
                    })
                }
            } else {
                tempCart.push({
                    id: productContent.id,
                    quantity: productCount,
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
        <>
            <Header />
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
                                    <Breadcrumb.Item>Detail Product</Breadcrumb.Item>    
                                </Breadcrumb>
                                <h2 className="font-semibold text-[20pt] my-3">Detail Product</h2>
                                <div className="h-48 sm:h-64 xl:h-64 2xl:h-80 my-3">
                                    <div className="shadow-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8 flex flex-col-reverse gap-5 sm:flex-row">
                                        <section className="sm:w-[80%]">
                                            <span href="#" className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 mb-2">
                                                {product.category}
                                            </span>
                                                <h1 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-extrabold mb-2">{product.title}</h1>
                                                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6 mt-5">{product.description}</p>
                                                <p className="text-md font-normal text-gray-500 dark:text-gray-400 mb-6 mt-1">Availability Stock: { product.quantity }</p>
                                            <div className="flex sm:items-center justify-between sm:justify-start gap-5 sm:gap-20 flex-col sm:flex-row">
                                                <span className="text-3xl font-bold text-gray-900 dark:text-white">${ product.price }</span>
                                                <div className="flex gap-2">
                                                    <input type="number" min="1" value={productCount} onChange={e => handleInput(e)} id="default-input" className="w-16 bg-gray-50 border border-gray-300 text-gray-900 text-md text-center font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    <button onClick={() => processCart(product)} className="rounded-lg flex-grow sm:flex-grow-0 bg-cyan-700 px-5 py-2.5 text-center text-md font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">Add to cart</button>        
                                                </div>
                                            </div>
                                        </section>
                                        <aside className="sm:w-[20%] self-center w-[50%]">
                                            <img src={product.image} />    
                                        </aside>    
                                    </div>
                                    {/* <p>Our product</p> */}
                                    <div className="mt-5 pb-20">
                                        <h3 className="font-semibold text-[15pt] my-3">You might also be interested in these products.</h3>
                                        <Products data={data} config={{id: id, limit: 4, category: product.category}}  />    
                                    </div>
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

export default DetailProduct;