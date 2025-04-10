import { useEffect } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { AlertModalEvent } from '../../persistents/events/alert-modal.event';
import { useAlertModalStore } from '../../store/alert-modal.store';

export default function Modal() {
  const { open, title, message, onOpen, onClose } = useAlertModalStore();

  const handleEvent = AlertModalEvent.handleEvent(onOpen);

  useEffect(() => {
    window.addEventListener(AlertModalEvent.name, handleEvent);

    return () => {
      window.removeEventListener(AlertModalEvent.name, handleEvent);
    };
  }, []);

  return (
    <Dialog open={open} aria-labelledby="alert-modal-title" aria-describedby="alert-modal-description">
      <DialogTitle id="alert-modal-title">{title}</DialogTitle>
      <DialogContent id="alert-modal-content" sx={{ width: 600 }}>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button size="small" sx={{ color: '#1e293b' }} onClick={onClose}>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
