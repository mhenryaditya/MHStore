import NewCard from "./Card";

function Products({data, config}) {
    if (!config) {
        return (
            <div className="flex gap-7 flex-wrap ">
                {Object.entries(data.products).map(([key, val]) => (
                  <NewCard key={val.id} product={val} className="flex-grow" />
                ))}
            </div>
        )
    } else {
        let products = Object.entries(data.products).filter((item) => (item[1].category === config.category) && (item[1].id != config.id))
        if (config.limit) {
            products.length = config.limit
        }
        return (
            <div className="flex gap-7 flex-wrap">
                {products.map(([key, val]) => (
                    <NewCard key={val.id} product={val} className="flex-grow" />
                ))}
            </div>
        )
    }
}

export default Products;