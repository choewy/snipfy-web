import * as qrcode from 'qrcode';

export class QrCodeService {
  public toCanvas(element: HTMLElement, value: string) {
    qrcode.toCanvas(element, value);
  }

  async toDataURL(linkUrl: string) {
    return new Promise<string>((resolve, reject) => {
      qrcode.toDataURL(linkUrl, (error, url) => {
        if (error) {
          reject(error);
        } else {
          resolve(url);
        }
      });
    });
  }
}

export const qrCodeService = new QrCodeService();
