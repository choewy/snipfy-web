import { useEffect } from 'react';

import { ModalComponent } from './modal.component';

import { AlertModalOpenEvent } from '../../persistents/events/alert-modal-open.event';
import { useAlertModalStore } from '../../store/alert-modal.store';

export default function Modal() {
  const { onOpen } = useAlertModalStore();

  useEffect(() => {
    const handleEvent = AlertModalOpenEvent.handleEvent(onOpen);

    window.addEventListener(AlertModalOpenEvent.name, handleEvent);

    return () => {
      window.removeEventListener(AlertModalOpenEvent.name, handleEvent);
    };
  }, []);

  return <ModalComponent.AlertModal />;
}
