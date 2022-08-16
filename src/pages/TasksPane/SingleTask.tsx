import React from 'react';
import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Typography,
  Stack,
  Tooltip,
  Zoom,
  Box,
} from '@mui/material';
import {} from '@mui/system';

// COMPONENTS
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Assignment } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

//DATA
import { removeTask } from './TasksSlice';
import { Task } from 'data/models/tasks';

import styles from './tasks.module.scss';

interface TaskProps {
  task: Task;
  index: number;
  isDraggingOver: boolean;
}

const SingleTask: React.FC<TaskProps> = ({ task, index }) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleElipsisClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const showElipsisActionMenu = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon>
            <Assignment fontSize="small" />
          </ListItemIcon>
          View Details
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <Divider />
        <MenuItem
          aria-label="delete"
          sx={{
            '&:hover': {
              color: 'red',
            },
          }}
          onClick={() => {
            dispatch(removeTask(task.id));
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Remove
        </MenuItem>
      </Menu>
    );
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => {
        let taskStyle = [styles['task']];
        if (snapshot.isDragging) {
          taskStyle.push(styles['dragging-over']);
        }
        return (
          <Tooltip
            title="Drag to change status"
            placement="bottom-start"
            TransitionComponent={Zoom}
          >
            <Paper
              key={task.id}
              elevation={3}
              className={taskStyle.join(' ')}
              // sx={style}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <Box sx={{ display: 'flex' }}>
                <div>{task.title}</div>
                <Stack direction="row" className={styles['task-actions']}>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleElipsisClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Stack>
              </Box>

              {showElipsisActionMenu()}
            </Paper>
          </Tooltip>
        );
      }}
    </Draggable>
  );
};

export default SingleTask;
