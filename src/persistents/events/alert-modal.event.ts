export class AlertModalEvent extends CustomEvent<{
  title: string;
  message: string;
}> {
  constructor(title: string, message: string) {
    super(AlertModalEvent.name, { detail: { title, message } });
  }

  dispatch() {
    window.dispatchEvent(this);
  }

  public static handleEvent(dispatch: (title: string, message: string) => void) {
    return (e: Event) => {
      const event = e as AlertModalEvent;

      dispatch(event.detail.title, event.detail.message);
    };
  }

  public static open(title: string, message: string) {
    new AlertModalEvent(title, message).dispatch();
  }
}
