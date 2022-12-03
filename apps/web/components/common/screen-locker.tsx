import { Backdrop, CircularProgress } from '@mui/material';

export default function ScreenLocker({ lock }: { lock?: boolean }) {
  return (
    <Backdrop open={!!lock} sx={{ zIndex: 999999999 }}>
      <CircularProgress />
    </Backdrop>
  );
}
