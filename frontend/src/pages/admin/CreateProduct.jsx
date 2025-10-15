import { useState } from "react";

export const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    fromPrice: Number,
    toPrice: Number,
    image: "",
    total: "",
    status: "",
    discount: "",
    type: "",
    category: "",
  });

  return (
    <div className="w-full p-2 bg-base-100">
      <h1 className="text-3xl font-bold mt-5">Thêm sản phẩm mới tại đây</h1>
      <p className="">
        Tạo thêm nhiều sản phẩm khiến cho cửa hàng trở nên đa dạng và phong phú
        hơn
      </p>
      <hr className="my-5" />
      <form>
        <div className="flex flex-col gap-1">
          <label className="text-xl font-medium flex gap-1">
            Tên sản phẩm <p className="text-red-500">{"(*)"}</p>
          </label>
          <input
            type="text"
            placeholder="Nhập tên"
            className="bg-base-200 rounded-md border-2 border-base-content indent-1 p-1 focus:outline-base-300"
          />
        </div>
        <div className="flex flex-col gap-1 my-4">
          <label className="text-xl font-medium flex gap-1">
            Mô tả sản phẩm <p className="text-red-500">{"(*)"}</p>
          </label>
          <textarea
            type="text"
            placeholder="Nhập mô tả"
            rows={10}
            className="bg-base-200 rounded-md border-2 border-base-content indent-1 p-1 focus:outline-base-300"
          />
        </div>
        {/* Price */}
        <div className="flex flex-col gap-1">
          <label className="text-xl font-medium">Giá sản phẩm</label>
          <div className="flex gap-20">
            <div className="flex items-center gap-2">
              <label>Nhỏ nhất</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Nhập giá thấp nhất"
                className="bg-base-200 rounded-md border-2 border-base-content indent-1 p-1 focus:outline-base-300"
                onChange={(e) =>
                  setFormData({ ...formData, fromPrice: e.target.value })
                }
              />
              <span>
                {Number(formData.fromPrice || 0).toLocaleString("vi-VN")} VNĐ
              </span>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex gap-1">
                Lớn nhất <p className="text-red-500">{"(*)"}</p>
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Nhập giá lớn nhất"
                className="bg-base-200 rounded-md border-2 border-base-content indent-1 p-1 focus:outline-base-300"
                onChange={(e) =>
                  setFormData({ ...formData, toPrice: e.target.value })
                }
              />
              <span>
                {Number(formData.toPrice || 0).toLocaleString("vi-VN")} VNĐ
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-around my-4">
          <div className="flex gap-1">
            <label className="text-xl font-medium flex gap-1">
              Số lượng <p className="text-red-500">{"(*)"}</p>
            </label>
            <input
              type="text"
              inputMode="numeric"
              className="bg-base-200 rounded-md border-2 border-base-content indent-1 p-1 focus:outline-base-300"
              placeholder="Tổng sản phẩm hiện có"
            />
          </div>
          <div className="flex gap-1">
            <label className="text-xl font-medium flex gap-1">Tình trạng</label>
            <input
              type="text"
              inputMode="numeric"
              className="bg-base-200 rounded-md border-2 border-base-content indent-1 p-1 focus:outline-base-300"
            />
          </div>
          <div className="flex gap-1">
            <label className="text-xl font-medium flex gap-1">Giảm giá</label>
            <input
              type="text"
              inputMode="numeric"
              className="bg-base-200 rounded-md border-2 border-base-content indent-1 p-1 focus:outline-base-300"
            />
          </div>
        </div>
        {/* Type */}
        <div className="my-4 mb-100">
          <div className="flex flex-col gap-1">
            <label className="text-xl font-medium flex gap-1">
              Các loại hình sản phẩm <p className="text-red-500">{"(*)"}</p>
            </label>
            <input type="text" />
          </div>
        </div>
      </form>
    </div>
  );
};
