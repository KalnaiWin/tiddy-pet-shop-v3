import { CirclePlus, Package2Icon } from "lucide-react";
import { TotalCategory } from "../../data/DataList";
import { Link } from "react-router";

export const ProductManage = () => {
  return (
    <div className="w-full h-screen p-5">
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
                  <item.icon style={{ color: item.color }} />
                </div>
                <p className={`${item.bg1} rounded-md text-xl font-medium p-1`}>
                  358
                </p>
              </div>
            ))}
          </div>
          <button className="text-base-100 bg-base-content rounded-md px-4 py-1 text-md cursor-pointer hover:opacity-80">
            <Link className="flex flex-col justify-center items-center" to={"/dashboard/product/create"}>
              <CirclePlus />
              <span className="text-center">
                Thêm <br /> sản phẩm
              </span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
