import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { useErrorModalStore } from '../../store/error-modal.store';

// TODO
export class ModalComponent {
  public static ErrorModal() {
    const { open, message, onClose } = useErrorModalStore();

    return (
      <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">ERROR</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="small" sx={{ color: '#1e293b' }} onClick={onClose}></Button>
        </DialogActions>
      </Dialog>
    );
  }
}
