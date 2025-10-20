import { PlusCircleIcon } from "lucide-react";
import { UserList } from "../../data/DataList";

export const UsersManage = () => {
  return (
    <div>
      <div className="w-full bg-base-100 p-5">
        <div className="flex gap-5 w-full">
          <div className="flex gap-5">
            {UserList.map((user, index) => (
              <div
                key={index}
                className={`${user.bg} ${user.text} text-md uppercase flex flex-col gap-2 rounded-md p-2 hover:opacity-50 transition-all duration-200 cursor-pointer`}
              >
                <div className="flex justify-between items-center gap-10">
                  <p className="font-medium">{user.role}</p>
                  <user.icon className="size-8" />
                </div>
                <p className="text-2xl font-extrabold">23</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col w-full justify-between">
            <div>
              <button className="flex gap-2 cursor-pointer hover:opacity-80 p-2 bg-base-300 text-base-content rounded-md">
                <PlusCircleIcon />
                <p>Add new user</p>
              </button>
            </div>
            <div>
              <input
                type="text"
                className="bg-gray-300 w-full p-1 rounded-md indent-3 text-black border-2"
                placeholder="Tìm tên người dùng"
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
