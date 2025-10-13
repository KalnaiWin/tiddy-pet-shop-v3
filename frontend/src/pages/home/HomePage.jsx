import { BannerCategories } from "./BannerCategories";
import { GetStartedPage } from "./GetStartedPage";

export const HomePage = () => {
  return (
    <div className="w-full h-full bg-base-100">
      <GetStartedPage />
      <BannerCategories />
    </div>
  );
};
