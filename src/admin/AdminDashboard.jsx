import { useContext, useState } from "react";
import { LoadingOutlined, ShoppingOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../utils/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import AdminLayout from "./AdminLayout.jsx";
import { AdminContext } from "../context/AdminContext.jsx";

export default function AdminDashboardPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [rating, setRating] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [price, setPrice] = useState("");
  const [addProductLoading, setAddProductLoading] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const { isAdmin } = useContext(AdminContext);

  const getImgFile = (e) => setProductImage(e.target.files[0]);

  const addProductFunc = () => {
    if (!productImage) return message.error("Please select an image!");
    setAddProductLoading(true);
    const productsStorageRef = ref(storage, productImage.name);

    uploadBytes(productsStorageRef, productImage)
      .then(() => getDownloadURL(productsStorageRef))
      .then((url) =>
        addDoc(collection(db, "products"), {
          title,
          description,
          category,
          returnPolicy,
          rating,
          price,
          productImage: url,
        })
      )
      .then(() => {
        message.success("Product Added Successfully");
        setAddProductLoading(false);
        setIsProductModalOpen(false);
        // reset fields
        setTitle("");
        setDescription("");
        setCategory("");
        setReturnPolicy("");
        setRating("");
        setPrice("");
        setProductImage(null);
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to add product");
        setAddProductLoading(false);
      });
  };

  const handleAddProductClick = () => {
    if (isAdmin) {
      setIsProductModalOpen(true);
    } else {
      message.error("Please login as Admin to add product");
    }
  };

  return (
    <AdminLayout activeMenu="dashboard">
      {/* Add Product Modal */}
      <Modal
        centered
        title="Add Product"
        open={isProductModalOpen}
        onCancel={() => setIsProductModalOpen(false)}
        footer={null}
      >
        <div className="w-full mt-5 flex flex-col gap-4">
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product Title"
            className="border-2 rounded-lg p-2 w-full focus:outline-none"
          />
          <input
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product Description"
            className="border-2 rounded-lg p-2 w-full focus:outline-none"
          />
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 rounded-lg p-2 w-full focus:outline-none"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option>Electronics</option>
            <option>Vehicles</option>
            <option>Furniture</option>
            <option>Watches</option>
            <option>Baby Products</option>
            <option>Men Clothes</option>
            <option>Women Clothes</option>
          </select>
          <input
            onChange={(e) => setReturnPolicy(e.target.value)}
            placeholder="Return Policy"
            className="border-2 rounded-lg p-2 w-full focus:outline-none"
          />
          <input
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating"
            type="number"
            className="border-2 rounded-lg p-2 w-full focus:outline-none"
          />
          <input
            onChange={getImgFile}
            type="file"
            className="border-2 rounded-lg p-2 w-full focus:outline-none"
          />
          <input
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="border-2 rounded-lg p-2 w-full focus:outline-none"
          />
          <button
            onClick={addProductFunc}
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 ease-in-out font-semibold text-white p-2 rounded-lg mt-2 w-full flex justify-center"
          >
            {addProductLoading ? <LoadingOutlined /> : "Add Product"}
          </button>
        </div>
      </Modal>

      {/* Dashboard Content */}
      <div className="flex flex-col items-center justify-center h-full lg:mt-0 mt-40 lg:mb-0 mb-40 px-10 ">
        <h1 className="lg:text-3xl md:text-3xl text-lgl font-bold mb-3">Welcome to Admin Dashboard 👋</h1>
        <p className="font-semibold text-gray-600 mb-8 text-center lg:text-base md:text-base text-sm max-w-xl">
          Manage your store efficiently, add new products, manage all listed products, and track user orders from one place.
        </p>

        <button
          onClick={handleAddProductClick}
          className="flex gap-2 hover:gap-3 bg-blue-600 text-white px-5 py-2 rounded-lg lg:text-lg text-base font-semibold hover:bg-blue-700 transition-all duration-200 ease-in-out"
        >
          Add Product <ShoppingOutlined />
        </button>
      </div>
    </AdminLayout>
  );
}
