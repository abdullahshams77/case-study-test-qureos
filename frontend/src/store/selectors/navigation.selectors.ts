import { useAppSelector } from "@/store/store";

export function navigationSelector() {
    const navigationState = useAppSelector((state) => state.navigation);
    const navState = navigationState && navigationState.get('navigationState')
    return navState;
}