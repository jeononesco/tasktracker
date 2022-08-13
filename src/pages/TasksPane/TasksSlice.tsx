import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../data/models/tasks';
import { RootState } from '../../data/redux/store';

interface taskState {
  tasksItems: Task[];
}

const initialState: taskState = {
  tasksItems: [],
};

console.log('Task Slice');

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // somefunc: (state, action: PayloadAction<string>) =>
    addTask: (state, action: PayloadAction<string>) => {
      console.log('What in the hell');
      state.tasksItems = [
        ...state.tasksItems,
        {
          id: Date.now(),
          title: action.payload,
          status: 'todo',
        },
      ];
    },
    justPrint: state => {
      console.log('I am fucking called');
    },
  },
});

export const { addTask, justPrint } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasksItems;

export default taskSlice.reducer;
