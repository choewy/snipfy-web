import { useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

import { NotiStackEvent } from '../../persistents/events/noti-stack.event';

function NotiStackListener() {
  const { enqueueSnackbar } = useSnackbar();

  const handleEvent = NotiStackEvent.handleEvent(enqueueSnackbar);

  useEffect(() => {
    window.addEventListener(NotiStackEvent.name, handleEvent);

    return () => {
      window.removeEventListener(NotiStackEvent.name, handleEvent);
    };
  }, []);

  return <></>;
}

export default function NotistackProvider() {
  return (
    <SnackbarProvider maxSnack={5} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <NotiStackListener />
    </SnackbarProvider>
  );
}
