import { taskStatus } from 'data/statics';

export interface Task {
  id: number;
  title: string;
  status: taskStatus;
}
