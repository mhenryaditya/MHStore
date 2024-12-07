import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { setEmailUser, setNameUser } from "../data/userReducer"
import toast from "react-hot-toast"
import fillStore from "../plugins/userProfileStore"
import refreshCount from "../plugins/cartCountStore"

function Header() {
    let data = useSelector(state => state)
    let dispatch = useDispatch()
    let [userDropdown, setUserDropdown] = useState(false)

    useEffect(() => {
        if (data.user.nameUser === null && data.user.emailUser === null) {
            fillStore(dispatch)
        }
        refreshCount(dispatch)
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
        toast.success("Logged out successfully!")
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
                    <div className="flex gap-7 items-center md:order-2">
                        {/* Navigation */}
                        <ul className="w-8 bg-gray-50 md:bg-slate-50 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {(data.user.nameUser !== null) ? (
                                <li>
                                    <Link to="/cart" className="relative flex rounded text-[#17c6b4]" aria-current="page">
                                        {data.cartCount > 0 ? (<span className="absolute z-10 text-[10pt] right-[-7%] bottom-4 rounded-full px-1.5 bg-green-700 text-white">{data.cartCount}</span>) : ''}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
                                           <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                                        </svg>
                                    </Link>
                                </li>
                            ) : ''}
                        </ul>
                        <div className="items-center justify-start w-fit">    
                            {/* User Profile */}
                            <div className="relative">
                                <button type="button" onClick={() => setUserDropdown(!userDropdown)} className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 rounded-full" src="/user.png" alt="user photo" />
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
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header