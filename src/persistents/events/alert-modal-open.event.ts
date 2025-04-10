export class AlertModalOpenEvent extends CustomEvent<{
  title: string;
  message: string;
}> {
  constructor(title: string, message: string) {
    super(AlertModalOpenEvent.name, { detail: { title, message } });
  }

  dispatch() {
    window.dispatchEvent(this);
  }

  public static handleEvent(dispatch: (title: string, message: string) => void) {
    return (e: Event) => {
      const event = e as AlertModalOpenEvent;

      dispatch(event.detail.title, event.detail.message);
    };
  }
}
