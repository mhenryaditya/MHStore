import Header from "../components/Header"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import { Toaster } from "react-hot-toast"
import Products from "../components/Products"
import fetchAPI from "../plugins/fetchData"
import Alert from "../components/Alert"
import Jumbotron from "../components/Jumbotron"

function App() {
  let data = useSelector((state) => state)
  let [isLoading, setLoading] = useState(true)
  let [isLostCon, setLostCon] = useState(false)
  let dispatch = useDispatch()

  let handleFetch = async () => {
    try {
      await fetchAPI(dispatch)
    } catch (error) {
      setLoading(false)
      setLostCon(true)
    }
    setLoading(false)
    
  }
  
  useEffect(() => {
    if (data.products.length === 0) {
      handleFetch()    
    } else {
      setLoading(false)
    }
  }, [data.products, fetchAPI, dispatch])

  return (
    <>
      <Header />
      <Toaster />
      {isLoading ? (
        <div className="flex justify-center mt-32">
          <Loading />
        </div>
      ) : (
          <div className="mb-10">
            <div className="max-w-screen-xl mx-auto px-4 mt-24">
              {!isLostCon ? (
                <div className="flex flex-col gap-3">
                  <Jumbotron />
                  {/* <p>Our product</p> */}
                  <h2 className="font-semibold text-[18pt]">All Products</h2>
                  <Products data={data} />
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

export default App;
