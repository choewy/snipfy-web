import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { useAlertModalStore } from '../../store/alert-modal.store';

export class ModalComponent {
  public static AlertModal() {
    const { open, title, message, onClose } = useAlertModalStore();

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
}
