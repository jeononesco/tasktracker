import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Task } from 'data/models/tasks';

import { useDispatch } from 'react-redux';
import { removeTask } from './TasksSlice';
import { Typography } from '@mui/material';

import { Droppable, Draggable } from 'react-beautiful-dnd';
import { taskStatus } from 'data/statics';
import { CustomStyles } from './TasksStyles';

interface TaskListProps {
  tasks_list: Task[];
  id: string;
  description: string;
}

interface TaskProps {
  task: Task;
  index: number;
  isDraggingOver: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks_list,
  description,
  id,
}) => {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => {
        let taskListStyle = CustomStyles().taskList;
        if (snapshot.isDraggingOver) {
          taskListStyle = {
            ...taskListStyle,
            backgroundColor: '#b3b3b3',
          };
        }
        return (
          <Box sx={taskListStyle}>
            <Typography sx={{ m: '0 0 20px 0', fontFamily: 'Courier' }}>
              {description}
            </Typography>
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              {tasks_list.map((task, index) => (
                <SingleTask
                  task={task}
                  index={index}
                  key={task.id}
                  isDraggingOver={snapshot.isDraggingOver}
                />
              ))}
              {provided.placeholder}
            </Box>
          </Box>
        );
      }}
    </Droppable>
  );
};

const SingleTask: React.FC<TaskProps> = ({ task, index }) => {
  const dispatch = useDispatch();

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => {
        let singleTaskStyle = CustomStyles().singleTask;
        if (snapshot.isDragging) {
          singleTaskStyle = {
            ...singleTaskStyle,
            boxShadow: '0 0 20px black',
          };
        }
        return (
          <Paper
            key={task.id}
            elevation={3}
            sx={singleTaskStyle}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Stack direction="row" sx={CustomStyles().taskAction}>
              <IconButton
                aria-label="edit"
                sx={{
                  '&:hover': {
                    backgroundColor: '#ccc',
                  },
                }}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                aria-label="delete"
                sx={{
                  '&:hover': {
                    backgroundColor: '#ccc',
                  },
                }}
                onClick={() => {
                  dispatch(removeTask(task.id));
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
            <Typography>{task.title}</Typography>
          </Paper>
        );
      }}
    </Draggable>
  );
};

export default TaskList;
