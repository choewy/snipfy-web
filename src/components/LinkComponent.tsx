import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';

import { LinkApi } from '../api/LinkApi';
import { QrCode } from '../persistent/qrcode';
import { LINK_FORCE_LINK_URL } from '../persistent/config';

export default function LinkComponent() {
  const [url, setUrl] = useState<string>('');

  const [result, setResult] = useState<{ id: string; type: string; url: string; expiredAt: string }>({
    id: '',
    type: '',
    url: '',
    expiredAt: '',
  });

  const [dataURL, setDataURL] = useState<string>('');

  const handleChangeUrlInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
  }, []);

  const handleSubmitForm = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const { data } = await LinkApi.createLink(url);

        setResult(data);
      } catch (e) {}
    },
    [url],
  );

  const onChangeResult = useCallback(async () => {
    if (!result.id) {
      return;
    }

    try {
      setDataURL(await QrCode.toDataURL(`${LINK_FORCE_LINK_URL}/${result.id}`));
    } catch (e) {}
  }, [result]);

  useEffect(() => {
    onChangeResult();
  }, [onChangeResult]);

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

      {result.id && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img alt="qrcode" src={dataURL} />
          <input readOnly value={`${LINK_FORCE_LINK_URL}/${result.id}`} />
        </div>
      )}
    </>
  );
}
