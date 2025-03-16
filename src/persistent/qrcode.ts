import * as qrcode from 'qrcode';

export class QrCode {
  public static toCanvas(element: HTMLElement, value: string) {
    qrcode.toCanvas(element, value);
  }

  public static async toDataURL(value: string) {
    return new Promise<string>((resolve, reject) => {
      qrcode.toDataURL(value, (error, url) => {
        if (error) {
          reject(error);
        } else {
          resolve(url);
        }
      });
    });
  }
}
