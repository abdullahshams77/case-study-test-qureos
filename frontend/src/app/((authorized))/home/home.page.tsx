"use client";
import { useHabitList } from "@/app/hooks/fetch/app";
import AppBox from "@/components/common/app.box/app.box";
import AppDialog from "@/components/common/app.dialog/app.dialog";
import GridTemplate from "@/components/common/templates/grid.template/grid.template";
import { useEffect, useState } from "react";
import HabitDialogDetails from "./habit.dialog.details";
import { appLoaderStatusSelector } from "@/store/selectors/app.selectors";
import AppSpinner from "@/components/common/app.spinner/app.spinner";
import AppLoaderButton from "@/components/common/app.loader.button/app.loader.button";
import { useAppDispatch } from "@/store/store";
import { archiveHabit, completeHabit } from "@/store/actions/app.actions";
import { useRefToastContext } from "@/app/toast.wrapper";
import { calculateDayDifference } from "@/components/common/util/util";

export default function HomePage() {
  const { data: habitList, isLoading: habitListLoading } = useHabitList({});
  const [showHabitDialog, setShowHabitDialog] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<any>("");
  const appToastRef = useRefToastContext();
  const onAddNewHabit = () => {
    setSelectedHabit("");
    setShowHabitDialog(true);
  };
  const hideHabitDialog = () => {
    setSelectedHabit("");
    setShowHabitDialog(false);
  };
  const dispatch = useAppDispatch();
  const appLoaderState: any = appLoaderStatusSelector();
  const action: any =
    appLoaderState &&
    appLoaderState.find(
      (action: any) =>
        action.get("actionType") == "ADD_NEW_HABIT" ||
        action.get("actionType") == "UPDATE_HABIT"
    );

  useEffect(() => {
    if (action && action.get("status") === "DONE") {
      hideHabitDialog();
    }
  }, [action]);

  const onEditHabit = (habit: any) => {
    setShowHabitDialog(true);
    setSelectedHabit(habit);
  };
  const archiveTheHabit = (e: any, habit: any) => {
    e.stopPropagation();
    dispatch(
      archiveHabit(
        {},
        {
          id: habit && habit.get("_id"),
          appToastRef,
          mutationKeys: [
            {
              key: "habits",
              params: {},
            },
          ],
        }
      )
    );
  };
  const completeTheHabit = (e: any, habit: any) => {
    e.stopPropagation();
    dispatch(
      completeHabit(
        {},
        {
          id: habit && habit.get("_id"),
          appToastRef,
          mutationKeys: [
            {
              key: "habits",
              params: {},
            },
          ],
        }
      )
    );
  };
  const isHabitDisabled = (habit:any) => {
    let disabled = false;
    for (const track of habit.get('tracking')) {
      const dayDifference = calculateDayDifference(new Date(),new Date(track.get('date')));
      if (dayDifference === 0) {
          disabled = true;
          break;
      }
    }
    return disabled;
  }

  return (
    <main>
      <GridTemplate>
        <AppBox
          backgroundColor="#f6fff1"
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
                key={index}
                footer={
                  <div className="w-12 lg:w-12">
                    {!habit.get("isArchieved") ? (
                      <AppLoaderButton
                        disabled={isHabitDisabled(habit)}
                        onClick={(e: any) => completeTheHabit(e, habit)}
                        //actionType={"ARCHIVE_HABIT"}
                        label="Done for today?"
                      />
                    ) : null}
                  </div>
                }
                header={
                  <div className="w-12 lg:w-5">
                    {!habit.get("isArchieved") ? (
                      <AppLoaderButton
                        style={{
                          backgroundColor: "var(--bluegray-100)",
                          color: "var(--surface-600)",
                          borderRadius: 8,
                          height: "30px",
                        }}
                        onClick={(e: any) => archiveTheHabit(e, habit)}
                        //actionType={"ARCHIVE_HABIT"}
                        label="Archive"
                      />
                    ) : null}
                  </div>
                }
                onClick={() => onEditHabit(habit)}
                description={habit.get("goal")}
                heading={habit.get("title")}
                //value={data.value}
              />
            );
          })}
      </GridTemplate>
      {showHabitDialog === true ? (
        <AppDialog
          header={selectedHabit ? "Edit Habit" : "Add New Habit"}
          visible={showHabitDialog}
          onHide={hideHabitDialog}
        >
          <HabitDialogDetails selectedHabit={selectedHabit} />
        </AppDialog>
      ) : null}
      {habitListLoading ? <AppSpinner /> : null}
    </main>
  );
}
