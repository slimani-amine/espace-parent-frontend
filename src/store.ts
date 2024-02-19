import { configureStore } from "@reduxjs/toolkit";
import childReducer from "./features/dashboard/reducers/childReducer";
import childrensReducer from "./features/dashboard/reducers/childrensReducer";
import onechildReducer from "./features/dashboard/reducers/onechildReducer";
import classesReducer from "./features/dashboard/reducers/classesReducer";
import subjectsReducer from "./features/dashboard/reducers/subjectsReducer";
import oneSubjectReducer from "./features/subjects/reducers/oneSubjectReducer";
import getMeReducer from "./features/money/reducers/getMeReducer";
import operationsReducer from "./features/money/reducers/operationsReducer";

export const store = configureStore({
  reducer: {
    me: getMeReducer,
    childId: childReducer,
    childrens: childrensReducer,
    oneChildren: onechildReducer,
    classe: classesReducer,
    subjectProgression: subjectsReducer,
    oneSubject: oneSubjectReducer,
    userOperations: operationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
