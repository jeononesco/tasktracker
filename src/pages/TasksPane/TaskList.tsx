import React from 'react';

// COMPONENTS
import {
  Typography,
  IconButton,
  Box,
  Tooltip,
  Chip,
  Badge,
} from '@mui/material';
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import {
  AddBox,
  AssignmentIndOutlined,
  EmojiObjects,
  Grading,
  Help,
  HelpOutline,
  LightbulbCircle,
  ListAltOutlined,
  QuestionMarkRounded,
  Settings,
  TaskAlt,
} from '@mui/icons-material';
import SingleTask from './SingleTask';

// DATA
import { Task } from 'data/models/tasks';
import { useDispatch } from 'react-redux';
import { openNewTaskModal } from 'data';

import styles from './tasks.module.scss';
import { showIcon } from 'data/statics';

interface TaskListProps {
  tasks_list: Task[];
  id: string;
  description: string;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks_list,
  description,
  id,
}) => {
  const dispatch = useDispatch();

  const showTaskListHeader = () => {
    return (
      <Box className={`${styles['task-list-header']} ${styles[id]}`}>
        <Chip
          icon={showIcon(id)}
          label={description}
          className={styles['task-status-chip']}
        />
        <Badge
          badgeContent={tasks_list.length}
          color="primary"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        ></Badge>
        {tasks_list.length > 0 && (
          <Tooltip title="Create New Task">
            <IconButton
              aria-label="add"
              size="small"
              sx={{
                position: 'absolute',
                right: '1px',
                top: '1px',
              }}
              onClick={() => {
                dispatch(openNewTaskModal(id));
              }}
            >
              <AddBox />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    );
  };

  const showCreateTask = () => {
    return (
      <Box
        sx={{
          right: '2px',
          color: 'gray',
          '&:hover': {
            transform: 'scale(1.03)',
            color: 'black',
          },
          display: 'flex',
          alignItems: 'center',
          verticalAlign: 'middle',
          cursor: 'pointer',
          gap: '10px',
        }}
        onClick={() => {
          dispatch(openNewTaskModal(id));
        }}
      >
        <AddBox /> <div>Create New Task</div>
      </Box>
    );
  };

  const showTasks = (
    provided: DroppableProvided,
    snapshot: DroppableStateSnapshot,
  ) => {
    return (
      <Box
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={`${styles['task-list-body']}`}
      >
        {tasks_list.length > 0
          ? tasks_list.map((task, index) => (
              <SingleTask
                task={task}
                index={index}
                key={task.id}
                isDraggingOver={snapshot.isDraggingOver}
              />
            ))
          : showCreateTask()}

        {provided.placeholder}
      </Box>
    );
  };

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => {
        let taskListStyle = [styles[`task-list`]];
        if (snapshot.isDraggingOver) {
          taskListStyle.push(styles[`dragging-over`]);
        }
        taskListStyle.push(styles[id]);
        return (
          <Box className={taskListStyle.join(' ')}>
            {showTaskListHeader()}
            {showTasks(provided, snapshot)}
          </Box>
        );
      }}
    </Droppable>
  );
};

export default TaskList;
