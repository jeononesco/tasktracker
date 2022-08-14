import { Box, Typography, IconButton, TextField } from '@mui/material';
import { ButtonControl } from 'components/button/Button';
import ModalControl, { default_modal_style } from 'components/modal/Modal';
import {
  closeNewTaskModal,
  openNewTaskModal,
  selectNewTaskModal,
} from 'data';
import { addTask, selectTasks, updateTaskStatus } from './TasksSlice';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './tasks.module.scss';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TaskList from './TaskList';
import CloseIcon from '@mui/icons-material/Close';
import { taskStatuses } from 'data/statics';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Container, flexbox } from '@mui/system';
import { CustomStyles } from './TasksStyles';

export const TasksPane: React.FC = () => {
  const dispatch = useDispatch();
  const newTaskModal = useSelector(selectNewTaskModal);
  const tasksList = useSelector(selectTasks);
  const [task, setTask] = useState<string>('');

  const NewTaskModal = () => {
    return (
      <ModalControl
        open={newTaskModal}
        handleClose={() => {}}
        styles={CustomStyles().newTask}
      >
        <form onSubmit={handleAddTask}>
          <Box sx={CustomStyles().newTask}>
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
        sx={{
          m: '10px',
        }}
        color="primary"
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
      dispatch(addTask(task));
      setTask('');
      dispatch(closeNewTaskModal());
    }
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    dispatch(
      updateTaskStatus({
        task_id: draggableId,
        new_status: destination.droppableId,
      }),
    );
  };

  return (
    <>
      <div className={styles.header}>TaskTrack</div>
      <div className={styles.tools}>
        {NewTaskButton()}
        {NewTaskModal()}
        <Box sx={CustomStyles().container}>
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(taskStatuses).map(
              ([status, description], _) => {
                const tasks = tasksList.filter(
                  task => task.status === status,
                );
                return (
                  <TaskList
                    tasks_list={tasks}
                    key={status}
                    id={status}
                    description={description}
                  />
                );
              },
            )}
          </DragDropContext>
        </Box>
      </div>
    </>
  );
};
