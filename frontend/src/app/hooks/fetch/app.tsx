import useSWR from "swr";
import { fetcher2, useKey } from ".";
import { fromJS } from "immutable";
import { useRefToastContext } from "@/app/toast.wrapper";
import { useGlobalLoading } from "@/app/_components/global.loading.provider";

export function useSystemConfig(params: any = {}) {
  const { isPageLoaded } = useGlobalLoading(); // Use global loading state
  const key = useKey(`v1/system-config`, params);
  const appToastRef = useRefToastContext();
  //appToastRef.current?.show({ severity: 'error', summary: '', detail: 'test', life: 3000 });
  const { data, error, isLoading, mutate } = useSWR<any>(
    isPageLoaded ? key : null,
    (url: any) =>
      fetcher2(url, {
        ...params,
        appToastRef,
        method: "GET",
        type: "GET_SYSTEM_CONFIG",
      }),
    {
      refreshInterval: 0,
      revalidateIfStale: false,
      //revalidateOnMount: false, // Do not revalidate data on component mount
      revalidateOnFocus: false, // Do not revalidate data on component focus
    }
  );
  return {
    mutate,
    data: fromJS(data),
    isLoading,
    error,
  };
}

