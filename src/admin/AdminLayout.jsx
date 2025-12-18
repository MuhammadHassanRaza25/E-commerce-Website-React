import { Link } from "react-router-dom";
import { BarChartOutlined, ShopOutlined, ShoppingOutlined, TruckOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { message, Space, Modal } from "antd";
import Avatar from "antd/es/avatar/avatar.js";
import Footer from "../components/Footer.jsx";
import { AdminContext } from "../context/AdminContext.jsx";

export default function AdminLayout({ children, activeMenu }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adminEmailInp, setAdminEmailInp] = useState("");
    const [adminPassInp, setAdminPassInp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { isAdmin, adminLogin, adminLogout } = useContext(AdminContext);

    const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
    const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD;

    const handleLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (adminEmailInp === ADMIN_EMAIL && adminPassInp === ADMIN_PASS) {
                adminLogin();
                setIsModalOpen(false);
                setAdminEmailInp("");
                setAdminPassInp("");
                message.success("Admin Login Successfully");
            } else {
                message.error("Wrong Email/Password");
            }
            setIsLoading(false);
        }, 500);
    };

    const handleLogout = () => {
        setIsLoading(true);
        setTimeout(() => {
            adminLogout();
            setIsLoading(false);
            message.success("Admin Logout Successfully");
        }, 500);
    };

    return (
        <>
            {/* Admin Login Modal */}
            <Modal
                centered
                title="Admin Login"
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false)
                    setAdminEmailInp("");
                    setAdminPassInp("");
                }}
                footer={null}
            >
                <div className="w-full mt-5">
                    <div className="flex flex-col">
                        <input
                            value={adminEmailInp}
                            onChange={(e) => setAdminEmailInp(e.target.value)}
                            className="mb-4 border-2 font-semibold rounded-lg focus:outline-none placeholder:text-gray-500 w-full p-2"
                            type="text"
                            placeholder="Admin Email"
                        />
                        <input
                            value={adminPassInp}
                            onChange={(e) => setAdminPassInp(e.target.value)}
                            className="mb-4 border-2 font-semibold rounded-lg focus:outline-none placeholder:text-gray-500 w-full p-3"
                            type="password"
                            placeholder="Admin Password"
                        />
                        <button
                            disabled={isLoading}
                            onClick={handleLogin}
                            className="mt-2 flex justify-center bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-lg w-full font-bold text-center text-lg"
                        >
                            {isLoading ? <div className="formLoader"></div> : "Login"}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Navbar */}
            <nav className="bg-blue-600 flex items-center lg:px-4 md:px-4 px-0 py-1.5 flex-wrap justify-between border-b border-gray-400">
                <div className="flex items-center p-4 flex-shrink-0 text-white mr-6">
                    <Link to={"/"}>
                        <span className="flex items-center gap-3 font-bold lg:text-2xl md:text-2xl sm:text-xs tracking-tight">
                            Hassan Online Store <ShopOutlined className="lg:block hidden" />
                        </span>
                    </Link>
                </div>

                <div className="btnOrAvatarDiv flex items-center">
                    {isAdmin ? (
                        <>
                            <Space size={16} wrap>
                                <Avatar
                                    className="lg:w-10 lg:h-10 md:w-8 md:h-8 w-7 h-7"

                                    style={{ backgroundColor: "white", color: "#f56a00" }}
                                    src="/adminavatar.jpg"
                                />
                            </Space>
                            <button
                                disabled={isLoading}
                                onClick={handleLogout}
                                className="bg-white flex justify-center ml-5 mr-5 text-blue-600 lg:text-md md:text-md text-sm font-semibold p-1.5 lg:w-24 md:w-24 w-20 hover:font-bold rounded-md"
                            >
                                {isLoading ? <div className="formLoader bg-blue-500"></div> : "Logout"}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white ml-5 mr-5 text-blue-600 lg:text-md md:text-md text-sm font-semibold p-1.5 lg:w-24 md:w-24 w-20 hover:font-bold rounded-md"
                        >
                            Login
                        </button>
                    )}
                </div>
            </nav>

            {/* Admin Panel Layout */}
            <div className="adminDash flex min-h-[88vh]">
                {/* Sidebar */}
                <div className="adminSidebar flex flex-col pt-24 bg-white justify-start items-start w-72 h-full">
                    <Link to={"/admin"} className="w-full">
                        <h1
                            className={`adminHeading mb-10 pl-8 flex items-center gap-4 px-3 py-2 w-full font-bold text-start text-xl hover:text-blue-700 hover:bg-blue-50 ${activeMenu === "dashboard" ? "bg-blue-50 text-blue-800 border-r-4 border-blue-700" : "bg-gray-50 text-blue-800"
                                }`}
                        >
                            <BarChartOutlined className="text-2xl" /> Admin Dashboard
                        </h1>
                    </Link>
                    <Link to={"/admin/allproducts"} className="w-full">
                        <button
                            className={`adminBtn pl-8 flex items-center gap-4 px-3 py-2 w-full font-bold text-start text-xl mb-6 hover:text-blue-700 hover:bg-blue-50 ${activeMenu === "products" ? "bg-blue-50 text-blue-800 border-r-4 border-blue-700" : ""
                                }`}
                        >
                            <ShoppingOutlined className="text-2xl" /> All Products
                        </button>
                    </Link>
                    <Link to={"/admin/allorders"} className="w-full">
                        <button
                            className={`adminBtn pl-8 flex items-center gap-4 px-3 py-2 w-full font-bold text-start text-xl mb-6 hover:text-blue-700 hover:bg-blue-50 ${activeMenu === "orders" ? "bg-blue-50 text-blue-800 border-r-4 border-blue-700" : ""
                                }`}
                        >
                            <TruckOutlined className="text-2xl" /> All Orders
                        </button>
                    </Link>
                </div>

                {/* Content */}
                <div className="flex-1 bg-gray-50">{children}</div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t border-gray-300 lg:px-3 px-2">
                <Footer />
            </div>
        </>
    );
}
