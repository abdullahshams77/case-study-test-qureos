import { ButtonProps } from "primereact/button";

export interface appLoaderButtonTypes extends ButtonProps {
    actionType?: any | undefined
    loadingLabel?: string | undefined
    showLoader?: any
    loading?: boolean
}