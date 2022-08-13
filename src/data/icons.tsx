import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { JsxElement } from 'typescript';

type IconOptions = {
    [key: string]: JSX.Element;
}

export const Icons: IconOptions = {
    send: <SendIcon />,
    delete: <DeleteIcon />
}