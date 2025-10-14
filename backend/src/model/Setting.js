import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
  deliveryTime: {
    type: String,
    required: true,
    default: () => {
      const now = new Date();
      const day = now.getDate();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
});

const Setting = mongoose.model("Setting", settingSchema);
export default Setting;
