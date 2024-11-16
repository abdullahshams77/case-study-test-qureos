"use client";
import { useEffect } from "react";
import { navigationSelector } from "@/store/selectors/navigation.selectors";
import { useAppDispatch } from "@/store/store";
import { resetNavigation } from "@/store/actions/navigation.actions";
import useTransitionRouter from "./hooks/app.hooks/transition.router";

let timeoutNav: any = null;
const AppNavigator = () => {
  const { push } = useTransitionRouter();
  const navigationState: any = navigationSelector();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (navigationState) {
      push(navigationState);
      if (timeoutNav) {
        clearTimeout(timeoutNav);
      }
      timeoutNav = setTimeout(() => {
        dispatch(resetNavigation());
      }, 200);
    }
  }, [navigationState]);

  return null;
};

export default AppNavigator;
