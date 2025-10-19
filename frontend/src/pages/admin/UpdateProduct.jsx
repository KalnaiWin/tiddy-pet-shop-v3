import { useEffect, useRef, useState } from "react";
import { ArrowBigUp, CirclePlus, Loader2, XIcon } from "lucide-react";
import { useProductStore } from "../../store/useProductStore";
import { useNavigate, useParams } from "react-router";

export const UpdateProduct = () => {
  const { id: productId } = useParams();

  const { isUpdating, updateProduct, getProduct } = useProductStore();
  const navigate = useNavigate();
  const [oldImages, setOldImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [oldTypeImages, setOldTypeImages] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct(productId);
      setFormData({
        name: product.name,
        description: product.description,
        fromPrice: product.fromPrice,
        toPrice: product.toPrice,
        total: product.total,
        status: product.status,
        discount: product.discount,
        type: product.type?.length
          ? product.type
          : [{ price: 0, types: "", image: null }],
        category: product.category,
      });
      setOldImages(product.image || []);
      setOldTypeImages(product.type?.map((t) => t.image) || []);
    };

    fetchProduct();
  }, [productId]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    fromPrice: 0,
    toPrice: 0,
    total: "",
    status: "available",
    discount: "",
    type: [
      {
        price: 0,
        types: "",
        image: null,
        hasNewImage: false,
      },
    ],
    category: "Khác",
  });

  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("fromPrice", formData.fromPrice);
    form.append("toPrice", formData.toPrice);
    form.append("total", formData.total);
    form.append("status", formData.status);
    form.append("discount", formData.discount ? Number(formData.discount) : 0);
    form.append("category", formData.category);

    // Append old images that weren't deleted
    oldImages.forEach((img) => {
      form.append("oldImages", img);
    });

    // Append new images
    newImages.forEach((file) => {
      form.append("image", file);
    });

    // Handle types
    formData.type.forEach((t, index) => {
      form.append(`type[${index}][price]`, t.price);
      form.append(`type[${index}][types]`, t.types);
      form.append(`type[${index}][hasNewImage]`, t.hasNewImage);

      if (t.hasNewImage && t.image) {
        // New image - send file
        form.append("typeImages", t.image);
      } else if (!t.hasNewImage && oldTypeImages[index]) {
        // Old image - send URL
        form.append(`type[${index}][image]`, oldTypeImages[index]);
      }
    });

    const success = await updateProduct(productId, form);

    if (success) {
      setFormData({
        name: "",
        description: "",
        fromPrice: 0,
        toPrice: 0,
        total: "",
        status: "available",
        discount: "",
        type: [{ price: 0, types: "", image: null, hasNewImage: false }],
        category: "Khác",
      });
      setOldImages([]);
      setNewImages([]);
      setOldTypeImages([]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      navigate("/dashboard/product");
    }
  };

  return (
    <div className="w-full px-10 pb-10 bg-base-100">
      <h1 className="text-3xl font-bold mt-5">Chỉnh sửa sản phẩm tại đây</h1>
      <p className="">
        Thêm nhiều loại hàng mới hoặc thay đổi giá cả, tính năng của từng sản
        phẩm.
      </p>
      <hr className="my-5" />
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label className="text-xl font-medium flex gap-1">
            Tên sản phẩm <p className="text-red-500">{"(*)"}</p>
          </label>
          <textarea
            rows={2}
            type="text"
            value={formData.name}
            placeholder="Nhập tên"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-base-200 rounded-md border-2 border-base-content indent-1 p-1 focus:outline-base-300"
          />
        </div>
        <div className="flex flex-col gap-1 my-4">
          <label className="text-xl font-medium flex gap-1">
            Mô tả sản phẩm <p className="text-red-500">{"(*)"}</p>
          </label>
          <textarea
            type="text"
            value={formData.description}
            placeholder="Nhập mô tả"
            rows={10}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="bg-base-200 rounded-md border-2 border-base-content indent-1 p-1 focus:outline-base-300"
          />
        </div>
        <hr className="w-full my-10" />
        {/* Price */}
        <div className="flex flex-col gap-1">
          <label className="text-xl font-medium">Giá sản phẩm</label>
          <div className="flex gap-20">
            <div className="flex items-center gap-2">
              <label>Nhỏ nhất</label>
              <input
                type="text"
                value={formData.fromPrice}
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
                value={formData.toPrice}
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
              value={formData.total}
              inputMode="numeric"
              className="bg-base-200 rounded-md border-2 border-base-content indent-1 p-1 focus:outline-base-300"
              onChange={(e) =>
                setFormData({ ...formData, total: e.target.value })
              }
              placeholder="Tổng sản phẩm hiện có"
            />
          </div>
          <div className="flex gap-1">
            <label className="text-xl font-medium flex gap-1">Tình trạng</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="bg-base-200 rounded-md border-2 border-base-content indent-1 p-1 focus:outline-base-300"
            >
              <option value="available">Còn hàng</option>
              <option value="outofstock">Hết hàng</option>
            </select>
          </div>
          <div className="flex gap-1">
            <label className="text-xl font-medium flex gap-1">Giảm giá</label>
            <input
              type="text"
              inputMode="numeric"
              value={formData.discount}
              onChange={(e) =>
                setFormData({ ...formData, discount: e.target.value })
              }
              className="bg-base-200 rounded-md border-2 border-base-content indent-1 p-1 focus:outline-base-300"
              placeholder="25%"
            />
          </div>
        </div>
        {/* Type */}
        <div className="">
          <label className="text-xl font-medium">Sản phẩm khác</label>
          <p>
            {"( "}Xóa nếu không muốn thêm loại khác{" )"}
          </p>
          {formData.type.map((t, index) => (
            <div key={index} className="flex justify-between my-4">
              <div className="flex gap-1 items-center">
                <label className="font-medium">Loại</label>
                <input
                  type="text"
                  placeholder="Màu, kích cỡ, ..."
                  value={t.types}
                  onChange={(e) => {
                    const newTypes = [...formData.type];
                    newTypes[index].types = e.target.value;
                    setFormData({ ...formData, type: newTypes });
                  }}
                  className="bg-base-200 rounded-md border-2 border-base-content indent-1 p-1 focus:outline-base-300"
                />
              </div>
              <div className="flex items-center gap-1">
                <label className="font-medium">Giá</label>
                <input
                  type="number"
                  value={t.price}
                  placeholder="Giá loại này"
                  onChange={(e) => {
                    const newTypes = [...formData.type];
                    newTypes[index].price = Number(e.target.value);
                    setFormData({ ...formData, type: newTypes });
                  }}
                  className="bg-base-200 rounded-md border-2 border-base-content indent-1 p-1 focus:outline-base-300"
                />
              </div>
              <div className="flex items-center gap-1">
                <label className="font-medium">Hình</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const newTypes = [...formData.type];
                    newTypes[index].image = file;
                    newTypes[index].hasNewImage = true;
                    setFormData({ ...formData, type: newTypes });
                  }}
                  className="bg-base-200 rounded-md border-2 border-base-content indent-1 p-1 focus:outline-base-300"
                />
                {/* Show old image if exists and no new image */}
                {oldTypeImages[index] && !t.hasNewImage && (
                  <div className="relative">
                    <img
                      src={oldTypeImages[index]}
                      alt={`old-type-${index}`}
                      className="mt-2 size-20 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...oldTypeImages];
                        updated[index] = null;
                        setOldTypeImages(updated);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <XIcon />
                    </button>
                  </div>
                )}
                {/* Show new image preview if uploaded */}
                {t.hasNewImage && t.image && (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(t.image)}
                      alt={`new-type-${index}`}
                      className="mt-2 size-20 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  const newTypes = formData.type.filter((_, i) => i !== index);
                  setFormData({ ...formData, type: newTypes });
                  // Also remove from oldTypeImages
                  const updatedOldImages = oldTypeImages.filter(
                    (_, i) => i !== index
                  );
                  setOldTypeImages(updatedOldImages);
                }}
                className="bg-red-500 text-white px-2 rounded cursor-pointer size-10 hover:opacity-80"
              >
                <XIcon />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              setFormData({
                ...formData,
                type: [
                  ...formData.type,
                  { price: 0, types: "", image: null, hasNewImage: false },
                ],
              });
            }}
            className="bg-base-content text-white p-2 rounded flex items-center cursor-pointer my-3 gap-1 hover:opacity-80"
          >
            <CirclePlus />
            <p>Thêm sản phẩm cùng loại</p>
          </button>
        </div>
        <hr className="w-full my-10" />
        <div className="flex flex-col gap-1">
          {" "}
          <label className="text-xl font-medium">Loại sản phẩm</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="bg-base-200 rounded-md border-2 border-base-content indent-1 p-1 focus:outline-base-300"
          >
            <option value="Chăm sóc sức khỏe">Chăm sóc sức khỏe</option>
            <option value="Làm đẹp cho thú cưng">Làm đẹp cho thú cưng</option>
            <option value="Thức ăn cho thú cưng">Thức ăn cho thú cưng</option>
            <option value="Vệ sinh cho thú cưng">Vệ sinh cho thú cưng</option>
            <option value="Phụ kiện cho thú cưng">Phụ kiện cho thú cưng</option>
            <option value="Khác">Khác</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-xl flex gap-1">
            Những hình ảnh của sản phẩm
            <p className="text-red-500">{"(*)"}</p>
          </label>
          <div className="w-full bg-white py-10 flex flex-col justify-end items-center gap-10 rounded-md border-3 border-dashed">
            {oldImages.length === 0 && newImages.length === 0 ? (
              <div className="flex flex-col gap-2 items-center">
                <div className="size-20 flex justify-center items-center bg-base-content text-base-100 rounded-full">
                  <ArrowBigUp className="size-15" />
                </div>
                <p>Upload image here</p>
              </div>
            ) : (
              <div className="grid grid-cols-8 gap-2">
                {/* Display old images */}
                {oldImages.map((img, index) => (
                  <div className="relative" key={`old-${index}`}>
                    <img
                      src={img}
                      alt={`old-preview-${index}`}
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = oldImages.filter((_, i) => i !== index);
                        setOldImages(updated);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs size-8 flex justify-center items-center"
                    >
                      <XIcon />
                    </button>
                  </div>
                ))}
                {/* Display new images */}
                {newImages.map((img, index) => (
                  <div className="relative" key={`new-${index}`}>
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`new-preview-${index}`}
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = newImages.filter((_, i) => i !== index);
                        setNewImages(updated);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs size-8 flex justify-center items-center"
                    >
                      <XIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const fileArray = Array.from(e.target.files);
                setNewImages([...newImages, ...fileArray]);
                e.target.value = null;
              }}
              className="bg-base-200 rounded-full border-2 border-base-content indent-1 p-2 focus:outline-base-300"
            />
          </div>
        </div>
        {isUpdating ? (
          <button
            className="py-4 w-full bg-base-300 rounded-xl font-bold text-2xl mt-10 cursor-pointer opacity-50"
            disabled
          >
            <div className="flex gap-1 items-center justify-center">
              <Loader2 className="animate-spin" />
              <p>Đang thay đổi ...</p>
            </div>
          </button>
        ) : (
          <button
            className="py-4 w-full bg-base-300 rounded-xl font-bold text-2xl mt-10 hover:opacity-80 cursor-pointer"
            type="submit"
          >
            <p>Chỉnh sửa sản phẩm</p>
          </button>
        )}
      </form>
    </div>
  );
};
