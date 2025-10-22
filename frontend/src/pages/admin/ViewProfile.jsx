import { useUserStore } from "../../store/useUserStore";

export const ViewProfile = ({ userId }) => {
  const { allUsers } = useUserStore();

  const user = allUsers.find((u) => u._id === userId);

  return (
    <div className="">
      <div className="flex items-center gap-5">
        <img
          src={user.profilePic || "/assets/logo.png"}
          alt="Profile Picture"
          className="size-20"
        />
        <div className="flex flex-col">
          <p className="text-2xl font-bold">{user.name}</p>
          <p className="text-md italic opacity-60 font-medium">{user.email}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 my-4">
        <div>
          <strong>Tên người nhận: </strong>
          {user.address?.fullName || "Empty"}
        </div>
        <div>
          <strong>Số điện thoại: </strong>
          {user.address?.phone || "Empty"}
        </div>
        <div>
          <strong>Tên đường: </strong>
          {user.address?.street || "Empty"}
        </div>
        <div>
          <strong>Thành phố: </strong>
          {user.address?.city || "Empty"}
        </div>
        <div>
          <strong>Tỉnh: </strong>
          {user.address?.state || "Empty"}
        </div>
        <div>
          <strong>Địa chỉ nhà: </strong>
          {user.address?.postalCode || "Empty"}
        </div>
        <div>
          <strong>Quốc gia: </strong>
          {user.address?.country || "Việt Nam"}
        </div>
      </div>
    </div>
  );
};
