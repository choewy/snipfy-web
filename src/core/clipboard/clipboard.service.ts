export class ClipboardService {
  public async copyText(text: string) {
    navigator.clipboard.writeText(text);

    return true;
  }

  public async copyImage(image: string) {
    try {
      const imageRes = await fetch(image);
      const imageBlob = await imageRes.blob();

      await navigator.clipboard.write([
        new ClipboardItem({
          [imageBlob.type]: imageBlob,
        }),
      ]);

      return true;
    } catch {
      return false;
    }
  }
}

export const clipboardService = new ClipboardService();
