import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { taskStatus } from 'data/statics';
import { Task } from '../../data/models/tasks';
import { RootState } from '../../data/redux/store';

interface taskState {
  tasksItems: Task[];
}

interface UpdateTaskPayload {
  task_id: string;
  new_status: string;
}

const initialState: taskState = {
  tasksItems: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // somefunc: (state, action: PayloadAction<string>) =>
    addTask: (state, action: PayloadAction<string>) => {
      state.tasksItems = [
        ...state.tasksItems,
        {
          id: Date.now(),
          title: action.payload,
          status: 'todo' as taskStatus,
        },
      ];
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasksItems = state.tasksItems.filter(
        task => task.id !== action.payload,
      );
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<UpdateTaskPayload>,
    ) => {
      console.log('This is the state');
      const { task_id, new_status } = action.payload;

      let status = action.payload.new_status as taskStatus;

      state.tasksItems = state.tasksItems.map(task => {
        if (task.id.toString() === task_id) {
          return {
            ...task,
            status,
          };
        }
        return task;
      });
    },
  },
});

export const { addTask, removeTask, updateTaskStatus } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasksItems;

export default taskSlice.reducer;
