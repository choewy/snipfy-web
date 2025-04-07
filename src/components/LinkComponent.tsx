import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { qrCodeService } from '../utils/qrcode.service';
import { configService } from '../core/config/config.service';
import { snipfySignApiService } from '../api/snipfy/snipfy-api.service';

import { LinkComponentCreateLinkResultStateType } from './types';
import { LinkComponentCreateLinkStatus } from './enums';

export default function LinkComponent() {
  const [url, setUrl] = useState<string>('');
  const [result, setResult] = useState<LinkComponentCreateLinkResultStateType>({
    status: LinkComponentCreateLinkStatus.Pending,
    linkUrl: '',
    qrCodeUrl: '',
    expiredAt: '',
  });

  const handleChangeUrlInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
  }, []);

  const handleSubmitForm = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const createLinkResult = await snipfySignApiService.createLink(url);

      if (!createLinkResult.ok) {
        // TODO
        throw new Error('링크 생성 실패');
      }

      const linkUrl = `${configService.getSnipfyGatewayUrl()}/${createLinkResult.data.linkId}`;
      const qrCodeUrl = await qrCodeService.toDataURL(linkUrl);

      setResult({
        status: LinkComponentCreateLinkStatus.Success,
        linkUrl,
        qrCodeUrl,
        expiredAt: createLinkResult.data.expiredAt,
      });
    },
    [url],
  );

  return (
    <>
      <form
        onSubmit={handleSubmitForm}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <input type="url" name="url" value={url} onChange={handleChangeUrlInput} />
        <button type="submit">링크생성</button>
      </form>

      {result.status === LinkComponentCreateLinkStatus.Success && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img alt="qrcode" src={result.qrCodeUrl} />
          <input readOnly value={result.linkUrl} />
        </div>
      )}
    </>
  );
}
