import { useRefToastContext } from "@/app/toast.wrapper";
import AppDropdown from "@/components/common/app.dropdown/app.dropdown";
import AppInputTextArea from "@/components/common/app.input.text.area/app.input.text.area";
import AppInput from "@/components/common/app.input/app.input";
import AppLoaderButton from "@/components/common/app.loader.button/app.loader.button";
import { addNewHabit, updateHabit } from "@/store/actions/app.actions";
import { useAppDispatch } from "@/store/store";
import { useEffect, useState } from "react";
import { z } from "zod";

const habitSchema = z.object({
  habitTitle: z.string().min(1, "Habit title is required"),
  habitGoal: z.string().min(1, "Habit goal is required"),
});

export default function HabitDialogDetails(props: any) {
  const { selectedHabit } = props;
  const [state, setState] = useState({
    habitTitle: "",
    habitGoal: "",
    habitPriority: "0",
    habitDescription: "",
  });
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<any>({});
  const onChange = (name: any, e: any) => {
    setState({ ...state, [name]: e.target.value });
  };
  const appToastRef = useRefToastContext();
  const setHabitPriority = (value: any) => {
    setState({ ...state, habitPriority: value });
  };
  useEffect(() => {
    if (selectedHabit) {
      setState({
        ...state,
        habitTitle: selectedHabit.get("title"),
        habitGoal: selectedHabit.get("goal"),
        habitPriority: selectedHabit.get("priority")
          ? "" + selectedHabit.get("priority")
          : "0",
        habitDescription: selectedHabit.get("details"),
      });
    }
  }, [selectedHabit]);
  const saveHabit = () => {
    try {
      habitSchema.parse({
        habitTitle: state.habitTitle,
        habitGoal: state.habitGoal,
      });
      if(selectedHabit) {
        dispatch(
            updateHabit(
              {
                title: state.habitTitle,
                details: state.habitDescription,
                priority: state.habitPriority,
                goal: state.habitGoal,
              },
              {
                id: selectedHabit && selectedHabit.get("_id"),
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
      }
      else {
        dispatch(
            addNewHabit(
              {
                title: state.habitTitle,
                details: state.habitDescription,
                priority: state.habitPriority,
                goal: state.habitGoal,
              },
              {
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
      }
      
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: any = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          fieldErrors[path as keyof any] = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };
  const habitPriority = [
    { label: "Low", value: "0" },
    { label: "Medium", value: "1" },
    { label: "High", value: "2" },
  ];
  return (
    <div>
      <div className="grid w-12 lg:w-9">
        <div className="col-12">
          <label className="block font-medium text-900 text-xs mb-1">
            Habit Title
          </label>
          <AppInput
            value={state.habitTitle}
            onChange={(e) => onChange("habitTitle", e)}
            label="Habit Title"
            placeholder="Habit Title"
          />
          {errors.habitTitle && (
            <small className="block p-error mb-2">{errors.habitTitle}</small>
          )}
        </div>
        <div className="col-12">
          <label className="block font-medium text-900 text-xs mb-1">
            Habit Goal
          </label>
          <AppInput
            value={state.habitGoal}
            label="Drink water daily"
            onChange={(e) => onChange("habitGoal", e)}
            placeholder="Drink water daily"
          />
          {errors.habitGoal && (
            <small className="p-error">{errors.habitGoal}</small>
          )}
        </div>
        <div className="col-12">
          <label className="block font-medium text-900 text-xs mb-1">
            Priority
          </label>
          <AppDropdown
            value={state.habitPriority}
            options={habitPriority}
            onChange={(e: any) => setHabitPriority(e.value)}
            placeholder="Select habit priority"
          />
        </div>
      </div>
      <div className="grid w-12 mt-2">
        <div className="col-12">
          <AppInputTextArea
            value={state.habitDescription}
            onChange={(e) => onChange("habitDescription", e)}
            label="Habit Description"
            rows={4}
            placeholder="Habit Description"
          />
        </div>
      </div>
      <div>
        <div className="mt-3">
          <AppLoaderButton
            onClick={saveHabit}
            actionType={["ADD_NEW_HABIT","UPDATE_HABIT"]}
            label="Save"
          />
        </div>
      </div>
    </div>
  );
}
