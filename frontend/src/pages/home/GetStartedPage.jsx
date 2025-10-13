import { Link } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";
import { CategoryListHomePgae } from "../../data/DataList";

export const GetStartedPage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="w-full flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold">Tiddy Pet</h1>
      <p className=" text-center px-100">
        Chúng tôi luôn mang đến những sản phẩm chất lượng nhất cho thú cưng của
        bạn! Từ thức ăn, phụ kiện đến đồ chơi, thuốc men, dụng cụ vệ sinh, chúng
        tôi luôn sẵn sàng đồng hành để thú cưng của bạn khỏe mạnh và hạnh phúc
        mỗi ngày.
      </p>
      <div className="flex justify-center items-center mt-5 gap-5">
        <button className="p-2 bg-base-content text-base-100 rounded-md hover:opacity-50 transition-all duration-300">
          <Link to={"/product"}>Go Shopping</Link>
        </button>
        {authUser ? (
          <button className="p-2 border-2 rounded-md hover:opacity-50 transition-all duration-300">
            <Link to={"/profile"}>View Profile</Link>
          </button>
        ) : (
          <button className="p-2 border-2 rounded-md hover:opacity-50 transition-all duration-300">
            <Link to={"/login"}>Get Started</Link>
          </button>
        )}
      </div>
      <h1 className="text-center font-medium text-xl my-3">
        Các loại sản phẩm chúng tôi hiện đang bán
      </h1>
      <div className="grid grid-cols-3 gap-2">
        {CategoryListHomePgae.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="relative overflow-hidden group"
          >
            <img
              src={item.href}
              alt="category"
              className="object-cover size-80 transition-transform duration-500 group-hover:scale-110"
            />
            <p className="absolute top-2 left-2 text-base-100 font-normal py-1 px-2 bg-base-content rounded-md">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
