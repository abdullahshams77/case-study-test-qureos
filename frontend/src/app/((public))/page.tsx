"use client";
import AppInput from "@/components/common/app.input/app.input";
import AppLoaderButton from "@/components/common/app.loader.button/app.loader.button";
import { createUser } from "@/store/actions/app.actions";
import { useAppDispatch } from "@/store/store";
import { useState } from "react";

export default function Start() {
  const[email,setEmail] = useState("");
  const dispatch = useAppDispatch();
  const handleChange = (e:any) => {
       setEmail(e?.target?.value)
  };
  const onCreateUser = () => {
      dispatch(createUser({
         email
      }))
  }
  return (
    <main>
      <div className="flex justify-content-center align-items-center">
        <h1>Welcome to Habit Tracker Application</h1>
      </div>
      <div className="flex justify-content-center align-items-center">
        <div className="text-center w-12 sm:w-10 md:w-8 lg:w-6 text-xs sm:text-sm">
          <div className="flex">
            <h2>Please enter your email address to continue.</h2>
          </div>
          <AppInput
            name={""}
            //value={}
            onChange={handleChange}
            label={"Enter your email address"}
            //disabled={isEditing && index === 0}
            className="w-full"
          />
          <div className="mt-5">
            <AppLoaderButton onClick={onCreateUser} actionType={"ADD_NEW_HABIT"} label="Continue" />
          </div>
        </div>
      </div>
    </main>
  );
}
