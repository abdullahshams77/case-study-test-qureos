import React from "react";
import { Dropdown as PrimeDropdown } from "primereact/dropdown";

const AppDropdown: React.FC<any> = (props: any) => {
  const { value, disabled, loading, options, onChange, placeholder, className } = props;
  return (
    <PrimeDropdown
      disabled={disabled}
      value={value}
      loading={loading}
      options={options}
      onChange={onChange}
      placeholder={placeholder || "Select"}
      style={{ width: "100%" }}
      className={className}
    />
  );
};

export default AppDropdown;
