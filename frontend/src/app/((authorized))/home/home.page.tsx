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
import {
  calculateDayDifference,
  habitPriorities,
} from "@/components/common/util/util";
import { TabMenu } from "primereact/tabmenu";

export default function HomePage() {
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
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = [{ label: "Active Habits" }, { label: "Archived Habits" }];
  //We should seperate filter  component

  let filters = {
    isArchived: selectedTab == 0 ? false : true,
  };
  const { data: habitList, isLoading: habitListLoading } =
    useHabitList(filters);

  const dispatch = useAppDispatch();
  const appLoaderState: any = appLoaderStatusSelector();
  const action: any =
    appLoaderState &&
    appLoaderState.find(
      (action: any) =>
        action.get("actionType") == "ADD_NEW_HABIT" ||
        action.get("actionType") == "UPDATE_HABIT"
    );

  const actionArchive: any =
    appLoaderState &&
    appLoaderState.find(
      (action: any) => action.get("actionType") == "ARCHIVE_HABIT"
    );
  const actionComplete: any =
    appLoaderState &&
    appLoaderState.find(
      (action: any) => action.get("actionType") == "COMPLETE_HABIT"
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
    setSelectedHabit(habit);
    dispatch(
      archiveHabit(
        {},
        {
          id: habit && habit.get("_id"),
          appToastRef,
          mutationKeys: [
            {
              key: "habits",
              params: filters,
            },
          ],
        }
      )
    );
  };
  const completeTheHabit = (e: any, habit: any) => {
    e.stopPropagation();
    setSelectedHabit(habit);
    dispatch(
      completeHabit(
        {},
        {
          id: habit && habit.get("_id"),
          appToastRef,
          mutationKeys: [
            {
              key: "habits",
              params: filters,
            },
          ],
        }
      )
    );
  };
  const isHabitDisabled = (habit: any) => {
    let disabled = false;
    for (const track of habit.get("tracking")) {
      const dayDifference = calculateDayDifference(
        new Date(),
        new Date(track.get("date"))
      );
      if (dayDifference === 0) {
        disabled = true;
        break;
      }
    }
    return disabled;
  };

  return (
    <main>
      <div className="mb-3">
        <TabMenu
          model={tabs}
          activeIndex={selectedTab}
          onTabChange={(e) => setSelectedTab(e.index)}
        />
      </div>
      <div className="grid">
        {selectedTab == 0 ? (
          <div className="col-12 sm:col-6 md:col-4 lg:col-4 xl:col-3">
            <AppBox
              backgroundColor="#f6fff1"
              onClick={onAddNewHabit}
              description="Add new habit"
              heading={"Click here"}
              //value={data.value}
            />
          </div>
        ) : null}

        {habitList &&
          habitList.get("data") &&
          habitList.get("data").map((habit: any, index: any) => {
            const priority: any = habitPriorities.find(
              (priority) => priority.value == habit.get("priority")
            );
            return (
              <div className="col-12 sm:col-6 md:col-4 lg:col-4 xl:col-3">
                <AppBox
                  key={index}
                  footer={
                    <div className="w-12 lg:w-12">
                      {!habit.get("isArchieved") ? (
                        <AppLoaderButton
                          loading={
                            actionComplete &&
                            actionComplete.get("status") === "PENDING" &&
                            selectedHabit &&
                            selectedHabit.get("_id") == habit.get("_id")
                              ? true
                              : false
                          }
                          disabled={isHabitDisabled(habit)}
                          onClick={(e: any) => completeTheHabit(e, habit)}
                          //actionType={""}
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
                          loading={
                            actionArchive &&
                            actionArchive.get("status") === "PENDING" &&
                            selectedHabit &&
                            selectedHabit.get("_id") == habit.get("_id")
                              ? true
                              : false
                          }
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
                >
                  <div>
                    <div>{`Streak: ${habit.get("streak")}`}</div>
                    <div>{`Priority: ${priority && priority.label}`}</div>
                  </div>
                </AppBox>
              </div>
            );
          })}
      </div>
      {showHabitDialog === true ? (
        <AppDialog
          header={selectedHabit ? "Edit Habit" : "Add New Habit"}
          visible={showHabitDialog}
          onHide={hideHabitDialog}
        >
          <HabitDialogDetails filters={filters} selectedHabit={selectedHabit} />
        </AppDialog>
      ) : null}
      {habitListLoading ? <AppSpinner /> : null}
    </main>
  );
}
