import {
  EmojiObjects,
  Grading,
  ListAltOutlined,
  Settings,
  TaskAlt,
} from '@mui/icons-material';

enum statusList {
  backlog = 'backlog',
  wip = 'wip',
  review = 'review',
  done = 'done',
}
export type taskStatus = statusList;

type statusType = { [key in statusList as string]: string };

export const taskStatuses: statusType = {
  backlog: 'BACKLOG',
  wip: 'WORKING IN PROGRESS',
  review: 'FOR REVIEW',
  done: 'DONE',
};

export const showIcon = (status: string) => {
  switch (status) {
    case 'backlog':
      return <EmojiObjects />;
    case 'wip':
      return <Settings />;
    case 'review':
      return <Grading />;
    case 'done':
      return <TaskAlt />;
    default:
      return <ListAltOutlined />;
  }
};
