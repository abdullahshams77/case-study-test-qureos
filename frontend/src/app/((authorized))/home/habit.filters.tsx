import AppDropdown from "@/components/common/app.dropdown/app.dropdown";
import AppLoaderButton from "@/components/common/app.loader.button/app.loader.button";
import { durationOptions, getSubtractedDate, sortOptions } from "@/components/common/util/util";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export default function HabitFilters(props: any) {
  const [state, setState] = useState({
    title: "",
    sortBy: "creationDate",
    duration: "-1"
  });
  const onChange = (e: any) => {
    setState({ ...state, title: e?.target?.value });
  };
  const onSearch = () => {
    if(state.duration == "pastWeek") {
        props.onSearch({
            title: state.title,
            sortBy:  state.sortBy,
            creationDateFrom: getSubtractedDate(7)
        });
    }
    else {
        props.onSearch({
            title: state.title,
            sortBy:  state.sortBy
        });
    }
   
  };
  const setSortBy = (value: any) => {
    setState({ ...state, sortBy: value });
  };
  const setDuration = (value:any) => {
      setState({ ...state, duration: value });
  }
  return (
    <div
      className="pl-3 pr-3"
      style={{
        background: "#f6f6f6",
      }}
    >
      <div>
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
        <div className="flex">
          <div className="w-4 p-1 pl-2">
            <label className="block font-medium text-900 text-xs mb-1">
              Sort By
            </label>
            <AppDropdown
              value={state.sortBy}
              options={sortOptions}
              onChange={(e: any) => setSortBy(e.value)}
              placeholder="Sort By"
            />
          </div>
          <div className="w-4 p-1 pr-2">
            <label className="block font-medium text-900 text-xs mb-1">
              Duration
            </label>
            <AppDropdown
              value={state.duration}
              options={durationOptions}
              onChange={(e: any) => setDuration(e.value)}
              placeholder="Duration"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-content-end align-items-end">
        <div className="w-12 lg:w-3 md:w-3">
          <AppLoaderButton onClick={onSearch} label="Search" />
        </div>
      </div>
    </div>
  );
}
