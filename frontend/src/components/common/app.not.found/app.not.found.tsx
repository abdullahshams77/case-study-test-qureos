import React from "react";
import { Colors, TextColors } from "../util/util";
import { useGlobalLoading } from "@/app/_components/global.loading.provider";
const folderImage = "/assets/images/folder-image.png";

const AppNotFound = (props: any) => {
  const { heading, description, bgColor } = props;
  const { isPageLoaded } = useGlobalLoading(); // Use global loading state
  return (
    <div>
      {isPageLoaded ? (
        <div
          style={{ backgroundColor: bgColor ?? Colors.SurafceGray }}
          className="flex flex-column justify-content-center align-items-center gap-3 p-5 border-round-xl"
        >
          <img
            className="h-6rem md:h-6rem lg:h-6rem"
            src={folderImage}
            alt="Not found"
          />
          <h2 className="text-center mb-0">{heading}</h2>
          <p
            className="text-center w-12 sm:w-10 md:w-8 lg:w-6 text-xs sm:text-sm pb-4"
            style={{ color: TextColors.GreyOnDark }}
          >
            {description}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default AppNotFound;
