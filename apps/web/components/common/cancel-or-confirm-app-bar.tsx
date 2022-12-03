import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
  CircularProgress,
  ButtonProps,
} from '@mui/material';

import { default as CancelIcon } from '@mui/icons-material/Clear';
import { default as BackIcon } from '@mui/icons-material/ArrowBack';
import { default as ConfirmIcon } from '@mui/icons-material/Check';
import { ReactNode } from 'react';

type Props = {
  title?: string;
  cancel?: {
    icon?: 'cancel' | 'back' | ReactNode;
    onClick?: () => void;
  } & ButtonProps;
  confirm?: {
    icon?: 'cancel' | 'back' | ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  } & ButtonProps;
};

export function CancelOrConfirmAppBar(props: Props) {
  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar>
          <IconButton
            sx={{ mr: 2 }}
            {...props.cancel}
            onClick={props.cancel?.onClick}
          >
            {!props.cancel?.icon || props.cancel.icon === 'cancel' ? (
              <CancelIcon />
            ) : props.cancel.icon === 'back' ? (
              <BackIcon />
            ) : (
              props.cancel.icon
            )}
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {props.title ?? ''}
          </Typography>
          <IconButton
            {...props.confirm}
            onClick={props.confirm?.onClick}
            disabled={props.confirm?.disabled}
          >
            {props.confirm?.disabled ? (
              <CircularProgress />
            ) : !props.confirm?.icon || props.confirm.icon === 'confirm' ? (
              <ConfirmIcon />
            ) : (
              props.cancel?.icon
            )}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
