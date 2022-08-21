import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Toolbar,
  Chip,
} from '@mui/material';
import { ButtonControl } from 'components/button/Button';
import ModalControl, { modal_style } from 'components/modal/Modal';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CloseIcon from '@mui/icons-material/Close';
import { showIcon, taskStatuses } from 'data/statics';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { ViewKanban } from '@mui/icons-material';

import TaskList from './TaskList';

// DATA
import { addTask, selectTasks, updateTaskStatus } from './TasksSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  closeNewTaskModal,
  selectNewTaskModal,
  selectTaskStatus,
} from 'data';

//STYLES
import styles from './tasks.module.scss';
import modal_styles from '../../components/modal/modal.module.scss';

export const TasksPane: React.FC = () => {
  const dispatch = useDispatch();
  const newTaskModal = useSelector(selectNewTaskModal);
  const selectedTaskStatusAdd = useSelector(selectTaskStatus);
  const tasksList = useSelector(selectTasks);
  const [task, setTask] = useState<string>('');

  const NewTaskModal = () => {
    return (
      <ModalControl
        open={newTaskModal}
        handleClose={() => dispatch(closeNewTaskModal())}
      >
        <form onSubmit={handleAddTask}>
          <Box
            className={`${modal_style} ${modal_styles[selectedTaskStatusAdd]}`}
          >
            {/* MODAL HEADER */}
            <Box
              className={`${modal_styles['modal-header']} ${modal_styles[selectedTaskStatusAdd]}`}
            >
              <Chip
                icon={showIcon(selectedTaskStatusAdd)}
                label={taskStatuses[selectedTaskStatusAdd]}
                className={styles['task-status-chip']}
              />
              <div>New Task</div>
              <IconButton
                aria-label="close"
                onClick={() => {
                  dispatch(closeNewTaskModal());
                }}
                sx={{
                  marginLeft: 'auto',
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* MODAL BODY */}

            <Box className={modal_styles['modal-body']}>
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
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  m: 1.5,
                }}
              >
                <ButtonControl text="Save" type="submit" />
              </Box>
            </Box>
          </Box>
        </form>
      </ModalControl>
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      const payload = {
        title: task,
        status: selectedTaskStatusAdd,
      };
      dispatch(addTask(payload));
      setTask('');
      dispatch(closeNewTaskModal());
    }
  };

  const onDragEnd = (result: DropResult) => {
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
      <div className={styles.header}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ViewKanban />
          </IconButton>
          <Typography variant="h6">
            <b>TaskTrack </b>
          </Typography>

          <div style={{ color: 'grey' }}>{'| Track your tasks'}</div>
        </Toolbar>
      </div>
      <div className={styles.tools}>
        {/* {NewTaskButton()} */}
        {NewTaskModal()}
        <Box className={styles['task-lists-container']}>
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
