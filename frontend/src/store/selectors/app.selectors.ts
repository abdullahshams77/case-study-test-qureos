import { useAppSelector } from "@/store/store";

export function appLoaderStatusSelector() {
    const appState = useAppSelector((state) => state.app);

    const appLoaderState = appState && appState.get("appLoadersStatus")
    return appLoaderState;
}