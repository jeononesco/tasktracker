import { configureStore } from '@reduxjs/toolkit';
import ModalReducer from '../redux/reducers/ModalSlice';
import TaskReducer from '../../pages/TasksPane/TasksSlice';
export const store = configureStore({
  reducer: {
    modals: ModalReducer,
    tasks: TaskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
