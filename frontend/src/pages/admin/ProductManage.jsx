import { CirclePlus, Edit, Trash } from "lucide-react";
import { TotalCategory } from "../../data/DataList";
import { Link } from "react-router";
import { useProductStore } from "../../store/useProductStore";
import { useEffect, useState } from "react";

export const ProductManage = () => {
  const { allProduct, getAllProduct, isLoadingProduct, deleteProduct } =
    useProductStore();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    getAllProduct();
  }, [getAllProduct]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = allProduct.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(allProduct.length / itemsPerPage);

  const getTotalByCategory = (categoryName) => {
    if (!allProduct || !Array.isArray(allProduct)) return 0;

    return allProduct.filter((product) => product.category === categoryName)
      .length;
  };

  if (isLoadingProduct) {
    return <div className="w-full h-screen p-5">Đang tải...</div>;
  }

  return (
    <div className="w-full bg-base-100 p-5">
      {/* Information each category and add product */}
      <div className="w-full flex flex-col">
        <div className="flex justify-between">
          <div className="flex text-sm gap-2">
            {TotalCategory.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col gap-2 ${item.bg} px-2 py-2 rounded-md hover:opacity-80`}
              >
                <div className={`flex justify-between items-center gap-2`}>
                  <p>{item.name}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p
                    className={`${item.bg1} rounded-md text-xl font-medium p-1`}
                  >
                    {getTotalByCategory(item.link)}
                  </p>
                  <item.icon style={{ color: item.color }} />
                </div>
              </div>
            ))}
          </div>
          <button className="text-base-100 bg-base-content rounded-md px-4 py-1 text-md cursor-pointer hover:opacity-80">
            <Link
              className="flex flex-col justify-center items-center"
              to={"/dashboard/product/create"}
            >
              <CirclePlus />
              <span className="text-center">
                Thêm <br /> sản phẩm
              </span>
            </Link>
          </button>
        </div>
      </div>

      {/* Table static */}
      <div className="border border-base-300 my-10 rounded-lg p-5 bg-white shadow-sm">
        <div className="flex justify-between items-start mb-5">
          <h1 className="text-2xl font-bold mb-5">Quản lý các sản phẩm</h1>
          <input
            type="text"
            className="bg-gray-300 w-2/3 p-1 rounded-md indent-3 text-black border-2"
            placeholder="Tìm sản phẩm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-4 py-3 text-left">Hình</th>
                <th className="px-4 py-3 text-left">Tên</th>
                <th className="px-4 py-3 text-left">Giá</th>
                <th className="px-4 py-3 text-left">Ngày</th>
                <th className="px-4 py-3 flex justify-end">Hoạt động</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md border"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {product.fromPrice.toLocaleString()} ₫{" - "}
                    {product.toPrice.toLocaleString()} ₫
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(product.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="py-6 px-2 text-center flex justify-end">
                    <button className="text-blue-600 hover:underline mr-3 flex gap-1">
                      <Edit />
                      <p>Sửa</p>
                    </button>
                    <button
                      className="text-red-600 hover:underline flex gap-1"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <Trash />
                      <p>Xóa</p>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <div className="flex gap-2 justify-center mt-4">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </table>
        </div>
      </div>
    </div>
  );
};
