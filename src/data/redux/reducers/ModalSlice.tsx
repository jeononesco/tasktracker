import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface modalState {
  newTaskModal: boolean;
}

const initialState: modalState = {
  newTaskModal: false,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openNewTaskModal: state => {
      state.newTaskModal = true;
    },
    closeNewTaskModal: state => {
      state.newTaskModal = false;
    },
    // somefunc: (state, action: PayloadAction<string>) =>
  },
});

export const { openNewTaskModal, closeNewTaskModal } = modalSlice.actions;

export const selectNewTaskModal = (state: RootState) =>
  state.modals.newTaskModal;

export default modalSlice.reducer;
