enum statusList {
  todo = 'todo',
  ongoing = 'ongoing',
  review = 'review',
  done = 'done',
}
export type taskStatus = statusList;

type statusType = { [key in statusList as string]: string };

export const taskStatuses: statusType = {
  todo: 'TO DO',
  ongoing: 'WORKING IN PROGRESS',
  review: 'FOR REVIEW',
  done: 'DONE',
};
