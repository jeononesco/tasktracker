import { default_modal_style } from 'components/modal/Modal';
import useBreakpoints from '../../hooks/useBreakpoints';

let default_container_styles = {
  p: '2%',
  display: 'flex',
  flexDirection: 'row',
};

let default_tasklist_styles = {
  m: '0 15px 15px 0',
  p: '20px',
  width: '25%',
  backgroundColor: 'rgb(222, 222, 222)',
  display: 'flex',
  flexDirection: 'column',
  //   '&:hover': {
  //     backgroundColor: 'primary.main',
  //     opacity: [0.9, 0.8, 0.7],
  //   },
};

let default_task_styles = {
  p: '5px',
  m: '5px 0',
  width: '100%',
  fontSize: '12px',
  '&:hover': {
    boxShadow: '0 0 5px black',
    transform: 'scale(1.03)',
  },
  boxShadow: '0',
};

let default_task_actions_styles = {
  display: 'flex',
  justifyContent: 'flex-end',
};

export const CustomStyles = () => {
  let custom_styles = {
    newTask: default_modal_style,
    container: default_container_styles,
    taskList: default_tasklist_styles,
    singleTask: default_task_styles,
    taskAction: default_task_actions_styles,
  };
  const { isXs, isSm, isMd, isLg, active } = useBreakpoints();

  if (isXs) {
    return {
      ...custom_styles,
      newTask: {
        ...default_modal_style,
        top: '32.6%',
        width: '85%',
      },
      container: {
        ...default_container_styles,
        flexDirection: 'column',
      },
      taskList: {
        ...default_tasklist_styles,
        width: '100%',
      },
    };
  }
  if (isSm) {
    return {
      ...custom_styles,
      container: {
        ...default_container_styles,
        flexDirection: 'column',
      },
      taskList: {
        ...default_tasklist_styles,
        width: '100%',
      },
    };
  }
  if (isMd) {
    return {
      ...custom_styles,
      newTask: {
        ...default_modal_style,
        top: '32.6%',
        left: '20%',
      },
      container: {
        ...default_container_styles,
        flexDirection: 'column',
      },
      taskList: {
        ...default_tasklist_styles,
        width: '100%',
      },
    };
  } else if (isLg) {
    return {
      ...custom_styles,
      newTask: {
        ...default_modal_style,
        top: '25%',
        left: '21%',
      },
    };
  }
  return custom_styles;
};
