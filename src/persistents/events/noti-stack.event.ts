import { EnqueueSnackbar, VariantType } from 'notistack';

export class NotiStackEvent extends CustomEvent<{
  variant: VariantType;
  message: string;
}> {
  constructor(variant: VariantType, message: string) {
    super(NotiStackEvent.name, { detail: { variant, message } });
  }

  dispatch() {
    window.dispatchEvent(this);
  }

  public static handleEvent(dispatch: EnqueueSnackbar) {
    return (e: Event) => {
      const event = e as NotiStackEvent;

      dispatch({
        variant: event.detail.variant,
        message: event.detail.message,
        autoHideDuration: 3000,
      });
    };
  }

  public static error(message: string) {
    new NotiStackEvent('error', message).dispatch();
  }

  public static success(message: string) {
    new NotiStackEvent('success', message).dispatch();
  }

  public static warning(message: string) {
    new NotiStackEvent('warning', message).dispatch();
  }

  public static info(message: string) {
    new NotiStackEvent('info', message).dispatch();
  }
}
