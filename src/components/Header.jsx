import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import setUserProfileStore from "../plugins/userProfileStore"
import { setEmailUser, setNameUser } from "../data/userReducer"
import toast from "react-hot-toast"

function Header({ pageActive = 'home' }) {
    let data = useSelector(state => state)
    let dispatch = useDispatch()
    let [userDropdown, setUserDropdown] = useState(false)
    let [bcDropdown, setBcDropdown] = useState(false)
    // let navigate = useNavigate()

    let fillStore = async () => {
        let token = localStorage.getItem('token')
        if (token) {
            await setUserProfileStore(token, dispatch)
        }
    }

    useEffect(() => {
        if (data.user.nameUser === null && data.user.emailUser === null) {
            fillStore()
        }
    })

    let processLogOut = () => {
        toast.loading("Attempting to log out...");
                        
        dispatch(setNameUser(null))
        dispatch(setEmailUser(null))
        localStorage.removeItem('token')
        if (localStorage.getItem('cart')) {
            localStorage.removeItem('cart')
        }

        toast.dismiss();
        toast.success("Logged in successfully!")
    }

    let logOut = () => {
        setUserDropdown(!userDropdown)
        toast((t) => (
            <div className="p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                <h3 className="font-semibold text-lg">Logout Confirmation</h3>
                <p className="mt-2 text-sm">Are you sure you want to logout?</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            processLogOut()
                            toast.dismiss(t.id)
                        }}
                        className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        ), {duration: Infinity})
        
    }

    return (
        <>
            <nav className="bg-slate-50 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 shadow-lg">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/logo.png" className="h-[40px]" alt="MHStore Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MHStore</span>
                    </Link>
                    {/* Right */}
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <div className="items-center justify-start w-full md:flex md:w-auto md:order-1">    
                            
                            {/* User Profile */}
                            <div className="relative">
                                <button type="button" onClick={() => setUserDropdown(!userDropdown)} className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src="/user.png" alt="user photo" />
                                </button>
                                <div className={`${userDropdown ? 'block' : 'hidden'} absolute right-0 top-7 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
                                    <div className="px-4 py-3">
                                        {(data.user.nameUser === null) ? (
                                            <>
                                                <span className="block text-sm text-gray-900 dark:text-white">Guest</span>
                                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">You're not logged in</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="block text-sm text-gray-900 dark:text-white">{data.user.nameUser}</span>
                                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{data.user.emailUser}</span>
                                            </>
                                        )}
                                    </div>
                                    <ul className="py-2" aria-labelledby="user-menu-button">
                                        {(data.user.nameUser !== null) ? (
                                            <li>
                                                <Link to="/" onClick={logOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</Link>
                                            </li>
                                        ) : (
                                            <li>
                                                <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Login</Link>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <button onClick={() => setBcDropdown(!bcDropdown)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                    </div>
                    <div className={`${bcDropdown ? 'block' : 'hidden'} items-center justify-start w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                            {/* Navigation */}
                            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium w-full border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-slate-50 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {pageActive !== 'home' ? (
                                <>
                                    <li>
                                        <Link to="/" className="flex gap-2 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                            <img src="/shop.svg" alt="home" className="w-5" />
                                            <span>Home</span>
                                        </Link>
                                    </li>
                                    {(data.user.nameUser !== null) ? (
                                        <li>
                                            <Link to="/cart" className="flex gap-2 py-2 px-3 text-white bg-[#12c2b6] rounded" aria-current="page">
                                                <img src="/cart-white.svg" alt="home" className="w-5" />
                                                <span>Cart</span>
                                            </Link>
                                        </li>
                                    ) : ''}
                                    
                                </>) : (
                                    <>
                                        <li>
                                            <Link to="/" className="flex gap-2 py-2 px-3 text-white bg-[#12c2b6] rounded" aria-current="page">
                                                <img src="/shop-white.svg" alt="home" className="w-5" />
                                                <span>Home</span>
                                            </Link>
                                        </li>
                                        {(data.user.nameUser !== null) ? (
                                            <li>
                                                <Link to="/cart" className="flex gap-2 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                                    <img src="/cart.svg" alt="home" className="w-5" />
                                                    <span>Cart</span>
                                                </Link>
                                            </li>
                                        ) : ''}
                                    </>
                            )}
                            </ul>
                        </div>
                </div>
            </nav>
        </>
    )
}

export default Header