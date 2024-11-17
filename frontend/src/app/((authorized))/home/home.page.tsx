"use client";
import { useHabitList } from "@/app/hooks/fetch/app";
import AppBox from "@/components/common/app.box/app.box";
import AppDialog from "@/components/common/app.dialog/app.dialog";
import GridTemplate from "@/components/common/templates/grid.template/grid.template";
import { useEffect, useState } from "react";
import HabitDialogDetails from "./habit.dialog.details";
import { appLoaderStatusSelector } from "@/store/selectors/app.selectors";
import AppSpinner from "@/components/common/app.spinner/app.spinner";

export default function HomePage() {
  const { data: habitList, isLoading: habitListLoading } = useHabitList({});
  const [showHabitDialog, setShowHabitDialog] = useState(false);
  const onAddNewHabit = () => {
    setShowHabitDialog(true);
  };
  const hideHabitDialog = () => {
    setShowHabitDialog(false);
  };
  const appLoaderState: any = appLoaderStatusSelector();
  const action: any =
    appLoaderState &&
    appLoaderState.find(
      (action: any) => action.get("actionType") == "ADD_NEW_HABIT"
    );

  useEffect(() => {
    if (action && action.get("status") === "DONE") {
      hideHabitDialog();
    }
  }, [action]);
 
  return (
    <main>
      {habitListLoading ? <AppSpinner /> : null}
      <GridTemplate>
        <AppBox
          onClick={onAddNewHabit}
          description="Add new habit"
          heading={"Click here"}
          //value={data.value}
        />
        {habitList &&
          habitList.get("data") &&
          habitList.get("data").map((habit: any, index: any) => {
            return (
              <AppBox
                description={habit.get("goal")}
                heading={habit.get("title")}
                //value={data.value}
              />
            );
          })}
      </GridTemplate>
      {showHabitDialog === true ? (
        <AppDialog
          header={"Add New Habit"}
          visible={showHabitDialog}
          onHide={hideHabitDialog}
        >
          <HabitDialogDetails />
        </AppDialog>
      ) : null}
    </main>
  );
}
