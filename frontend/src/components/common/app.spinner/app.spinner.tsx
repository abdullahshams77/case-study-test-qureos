import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";
import styles from './app.spinner.module.css';

const AppSpinner = (props: any) => {
  return (
    <div className="card flex pt-5 pb-5 mt-5 w-100 align-items-center">
      <ProgressSpinner
        style={{ width: "70px", height: "70px" }}
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
        pt={{
          circle: { className: styles.customProgressSpinner }
        }}
      />
    </div>
  );
};

export default AppSpinner;
