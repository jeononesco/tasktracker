import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface modalState {
  newTaskModal: boolean;
}

const initialState: modalState = {
  newTaskModal: false,
};

console.log('Modal Slice');

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openNewTaskModal: state => {
      console.log('Opens Modal');
      state.newTaskModal = true;
    },
    closeNewTaskModal: state => {
      console.log('Closes Modal');
      state.newTaskModal = false;
    },
    // somefunc: (state, action: PayloadAction<string>) =>
  },
});

export const { openNewTaskModal, closeNewTaskModal } = modalSlice.actions;

export const selectNewTaskModal = (state: RootState) =>
  state.modals.newTaskModal;

export default modalSlice.reducer;
