import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/authSlice";

//Combined Reducer
const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

//The setup Store
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
