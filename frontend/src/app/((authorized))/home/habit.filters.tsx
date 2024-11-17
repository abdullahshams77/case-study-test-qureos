import AppLoaderButton from "@/components/common/app.loader.button/app.loader.button";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export default function HabitFilters(props: any) {
  const [state, setState] = useState({
    title: "",
  });
  const onChange = (e: any) => {
    setState({ ...state, title: e?.target?.value });
  };
  const onSearch = () => {
    props.onSearch(state)
  };

  return (
    <div
      className="pl-3 pr-3"
      style={{
        background: "#f6f6f6",
      }}
    >
      <div className="w-8 flex align-items-center">
        <div className="flex-grow-1 col-12 lg:col-3 xl:col-2 mb-2 lg:mb-0">
          <div className="w-full mt-0 p-inputgroup border-1 border-gray-200 border-round-xl p-1">
            <InputText
              onChange={onChange}
              type="text"
              placeholder="Search...."
              className="search-input border-none"
            />
            <Button
              icon="pi pi-search"
              className="search-button p-secondary border-none outline-none focus:outline-none focus:shadow-none"
              style={{ background: "white", color: "gray" }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-content-end align-items-end">
        <div className="w-12 lg:w-3 md:w-3">
          <AppLoaderButton
            onClick={onSearch}
            //onClick={}
            //actionType={"ARCHIVE_HABIT"}
            label="Search"
          />
        </div>
      </div>
    </div>
  );
}
