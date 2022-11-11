import { Alert, AlertColor, IconButton, Snackbar } from '@mui/material';
import { default as CloseIcon } from '@mui/icons-material/Close';
import { useState } from 'react';

type Props = {
  message: string;
  severity?: AlertColor;
};

export function Toast(props: Props) {
  const [isShowing, setShowing] = useState(true);
  return (
    <Snackbar
      open={isShowing}
      autoHideDuration={6000}
      onClose={() => setShowing(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert
        action={
          <IconButton
            color="inherit"
            size="small"
            onClick={() => setShowing(false)}
          >
            <CloseIcon />
          </IconButton>
        }
        severity={props.severity ?? 'info'}
        sx={{ width: '100%' }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
}

export function SuccessToast(props: Omit<Props, 'severity'>) {
  return <Toast severity="success" message={props.message} />;
}

export function InfoToast(props: Omit<Props, 'severity'>) {
  return <Toast severity="info" message={props.message} />;
}

export function WarningToast(props: Omit<Props, 'severity'>) {
  return <Toast severity="warning" message={props.message} />;
}

export function ErrorToast(props: Omit<Props, 'severity'>) {
  return <Toast severity="error" message={props.message} />;
}
