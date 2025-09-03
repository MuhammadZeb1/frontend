import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVendorProducts } from "../features/vendorProductsSlice";

function VendorProduct() {
  const { id } = useParams(); // vendor id from URL
  const dispatch = useDispatch();

  const {vendor, products, isLoading, error } = useSelector(
    (state) => state.vendorProduct
  );
  console.log(vendor)

  useEffect(() => {
    if (id) {
      dispatch(getVendorProducts(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return <p className="text-center mt-10 text-lg">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
  <div className="p-6 ">
    {products.length > 0 && products[0].vendor && (
      <div className="mb-6 text-center">
    <h2 className="text-2xl font-bold">{vendor.shopName}</h2>
    <p className="text-gray-600">{vendor.shopType}</p>
    <p className="text-gray-500 text-sm">
     Owner: {vendor.name} ({vendor.email})
        </p>
      </div>
    )}

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.length > 0 ? (
        products.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow rounded-2xl p-4 hover:shadow-lg transition"
          >
            <img
              src={p.image?.url}
              alt={p.productName}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold">{p.productName}</h3>
            <p className="text-gray-600">{p.title}</p>
            <p className="text-blue-600 font-bold mt-2">${p.price}</p>
            <p className="text-sm text-gray-500 mt-1">Category: {p.category}</p>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No products found for this vendor.
        </p>
      )}
    </div>
  </div>
);

}

export default VendorProduct;
