import { Box, Typography, IconButton, TextField } from '@mui/material';
import { ButtonControl } from 'components/button/Button';
import ModalControl, { default_modal_style } from 'components/modal/Modal';
import {
  closeNewTaskModal,
  openNewTaskModal,
  selectNewTaskModal,
} from 'data';
import { addTask, justPrint, selectTasks } from './TasksSlice';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useBreakpoints from '../../hooks/useBreakpoints';
import styles from './tasks.module.scss';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddTaskIcon from '@mui/icons-material/AddTask';

import CloseIcon from '@mui/icons-material/Close';

export const TasksPane: React.FC = () => {
  const dispatch = useDispatch();
  const newTaskModal = useSelector(selectNewTaskModal);
  const tasksList = useSelector(selectTasks);
  const [task, setTask] = useState<string>('');

  console.log('tasksList');
  console.log(tasksList);

  const CustomNewTaskModalStyles = () => {
    let style = default_modal_style;
    const { isXs, isSm, isMd, isLg, active } = useBreakpoints();
    if (isXs) {
      return {
        ...style,
        top: '32.6%',
        width: '85%',
      };
    }
    if (isMd) {
      return {
        ...style,
        top: '32.6%',
        left: '20%',
      };
    } else if (isLg) {
      return {
        ...style,
        top: '25%',
        left: '21%',
      };
    }
    return style;
  };

  const NewTaskModal = () => {
    return (
      <ModalControl
        open={newTaskModal}
        handleClose={() => {}}
        styles={CustomNewTaskModalStyles()}
      >
        <form onSubmit={handleAddTask}>
          <Box sx={CustomNewTaskModalStyles()}>
            <IconButton
              aria-label="close"
              onClick={() => {
                dispatch(closeNewTaskModal());
              }}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AddTaskIcon
                sx={{ color: 'action.active', mr: 1, my: 0.5 }}
              />
              <TextField
                id="input-with-sx"
                label="Enter Task"
                variant="standard"
                sx={{ width: '100%' }}
                onChange={e => {
                  setTask(e.target.value);
                }}
              />
            </Box>

            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', m: 1.5 }}
            >
              <ButtonControl text="Save" type="submit" />
            </Box>
          </Box>
        </form>
      </ModalControl>
    );
  };

  const NewTaskButton = () => {
    return (
      <Fab
        color="secondary"
        aria-label="add"
        onClick={() => {
          dispatch(openNewTaskModal());
        }}
      >
        <AddIcon />
      </Fab>
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      console.log('b4 dispatch');
      console.log(addTask(task));
      dispatch(addTask(task));

      dispatch(justPrint());

      console.log(justPrint());
      console.log('aft dispatch');
      setTask('');
      dispatch(closeNewTaskModal());

      console.log(closeNewTaskModal());
    }
  };

  return (
    <>
      <div className={styles.header}>TaskTrack</div>
      <div className={styles.tools}>
        {NewTaskButton()}
        {NewTaskModal()}
      </div>
    </>
  );
};
