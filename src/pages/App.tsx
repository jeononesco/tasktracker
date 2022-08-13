import React from 'react';
import styles from '../assets/styles.module.css';
import { TasksPane } from '../pages';

export const App: React.FC = () => {
  return (
    <div className={styles.main}>
        <TasksPane />
    </div>
  );
}
