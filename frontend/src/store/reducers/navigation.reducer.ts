const initialState = fromJS({
    navigationState: "",
  });
  import { createReducer } from "@reduxjs/toolkit";
  import { fromJS } from "immutable";
  
  export const navigationReducer = createReducer(initialState, (builder) => {
    builder
      .addCase("NAVIGATE", (state, action: any) => {
        return state.set("navigationState", action?.payload?.data?.redirectUrl);
      })
      .addCase("RESET_NAVIGATION", (state, action: any) => {
        return state.set("navigationState", "");
      })
      // and provide a default case if no other handlers matched
      .addDefaultCase((state, action) => {
        return state;
      });
  });
  