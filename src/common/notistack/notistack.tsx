import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

import { NotiStackEvent } from '../../persistents/events/noti-stack.event';

export default function NotiStack() {
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
