import { v4 } from 'uuid';

export class DownloadService {
  public async downloadImage(url: string, fileName: string) {
    const a = document.createElement('a');

    a.id = v4();
    a.hidden = true;
    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
  }
}

export const downloadService = new DownloadService();
