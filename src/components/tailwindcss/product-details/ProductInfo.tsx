export default function ProductInfo({ product, children }) {
  return (
    <div className="mt-10 px-4 lg:mt-0 sm:px-0">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        {product?.title}
      </h1>

      <p className="mt-3 text-3xl tracking-tight text-gray-900">
        BDT {product?.price}
      </p>

      <div
        className="mt-6 space-y-6 text-base text-gray-700"
        dangerouslySetInnerHTML={{ __html: product?.description }}
      />

      <form className="mt-6 space-y-8">
        {children}

        {/* Add to Cart */}
        <div className="flex mt-10">
          <button
            type="submit"
            className="flex-1 rounded-md bg-indigo-600 px-8 py-3 text-white font-medium hover:bg-indigo-700"
          >
            Add to Cart
          </button>
        </div>
      </form>
    </div>
  )
}
