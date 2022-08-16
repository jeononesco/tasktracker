import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface modalState {
  newTaskModal: boolean;
  newTaskSelectedStatus: string;
}

const initialState: modalState = {
  newTaskModal: false,
  newTaskSelectedStatus: 'todo',
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openNewTaskModal: (state, action) => {
      state.newTaskModal = true;
      state.newTaskSelectedStatus = action.payload;
    },
    closeNewTaskModal: state => {
      state.newTaskModal = false;
      state.newTaskSelectedStatus = 'todo';
    },
    // somefunc: (state, action: PayloadAction<string>) =>
  },
});

export const { openNewTaskModal, closeNewTaskModal } = modalSlice.actions;

export const selectNewTaskModal = (state: RootState) =>
  state.modals.newTaskModal;

export const selectTaskStatus = (state: RootState) =>
  state.modals.newTaskSelectedStatus;

export default modalSlice.reducer;
