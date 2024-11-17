import React from "react";

const AppBox = (props: any) => {
  const { heading, description, header, footer, backgroundColor } = props;

  return (
    <div
      onClick={props.onClick}
      className="cursor-pointer border-round-lg border-1 border-200 shadow-1 p-4 md:p-3 sm:p-2"
      style={{ borderRadius: "14px", height: "100%", backgroundColor : backgroundColor ? backgroundColor : "#ffffff" }}>
      <div>{header ? header : null}</div>
      <div className="flex justify-content-between align-items-start">
        <div className="flex flex-column">
          <span className="text-md font-semibold">{heading}</span>
          <span className="text-2xl font-bold my-2">{description}</span>
          <span className="text-sm text-gray-400"></span>
        </div>
      </div>
      <>{props.children}</>
      <div className="mt-4">{footer ? footer : null}</div>
    </div>
  );
};

export default AppBox;
