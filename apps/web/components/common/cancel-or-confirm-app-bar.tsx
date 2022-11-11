import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';

import { default as CancelIcon } from '@mui/icons-material/Clear';
import { default as BackIcon } from '@mui/icons-material/ArrowBack';
import { default as ConfirmIcon } from '@mui/icons-material/Check';
import { ReactNode } from 'react';

type Props = {
  title?: string;
  cancelIcon?: 'cancel' | 'back' | ReactNode;
  confirmIcon?: 'confirm' | ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
};

export function CancelOrConfirmAppBar(props: Props) {
  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar>
          <IconButton sx={{ mr: 2 }} onClick={props.onCancel}>
            {!props.cancelIcon || props.cancelIcon === 'cancel' ? (
              <CancelIcon />
            ) : props.cancelIcon === 'back' ? (
              <BackIcon />
            ) : (
              props.cancelIcon
            )}
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {props.title ?? ''}
          </Typography>
          <IconButton onClick={props.onConfirm}>
            {!props.confirmIcon || props.confirmIcon === 'confirm' ? (
              <ConfirmIcon />
            ) : (
              props.cancelIcon
            )}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
