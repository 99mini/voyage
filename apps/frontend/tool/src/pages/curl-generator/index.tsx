import { useState } from 'react';

import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  useToast,
} from '@packages/vds';

import CopyButton from '@/components/common/copy-button';

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

const CurlGenerator = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState('');
  const [body, setBody] = useState('');
  const [queryList, setQueryList] = useState([{ key: '', value: '' }]);

  const { toast } = useToast();

  const validateUrl = (url: string) => {
    try {
      // 빈 값은 에러
      if (!url.trim()) return 'URL을 입력하세요.';
      new URL(url);
      return '';
    } catch {
      return '유효하지 않은 URL입니다.';
    }
  };

  const validateQuery = (queryList: {key: string, value: string}[]) => {
    for (const q of queryList) {
      if ((q.key && !q.value) || (!q.key && q.value)) {
        return 'Query는 key와 value가 모두 입력되어야 합니다.';
      }
      if (q.key && !/^[-\w]+$/.test(q.key)) {
        return 'Query key는 영문, 숫자, -, _만 가능합니다.';
      }
    }
    return '';
  };

  const validateHeaders = (headers: string) => {
    if (!headers.trim()) return '';
    const lines = headers.trim().split('\n');
    for (const line of lines) {
      if (!/^\s*[^:]+:\s*.+$/.test(line)) {
        return '헤더는 각 줄마다 key: value 형식이어야 합니다.';
      }
    }
    return '';
  };

  const validateBody = (body: string, method: string) => {
    if (method === 'GET') return '';
    if (!body.trim()) return '';
    // JSON 형식만 허용 (더 유연하게 하려면 생략)
    try {
      JSON.parse(body);
      return '';
    } catch {
      return 'Body는 JSON 형식이어야 합니다.';
    }
  };

  const urlError = validateUrl(url);
  const queryError = validateQuery(queryList);
  const headersError = validateHeaders(headers);
  const bodyError = validateBody(body, method);
  const isValid = !urlError && !queryError && !headersError && !bodyError;

  const buildQueryString = () => {
    return queryList
      .filter(q => q.key.trim() && q.value.trim())
      .map(q => `${encodeURIComponent(q.key)}=${encodeURIComponent(q.value)}`)
      .join('&');
  };

  const addQueryRow = () => setQueryList([...queryList, { key: '', value: '' }]);
  const removeQueryRow = (idx: number) => setQueryList(queryList.length === 1 ? queryList : queryList.filter((_, i) => i !== idx));
  const updateQueryRow = (idx: number, field: 'key' | 'value', val: string) => {
    setQueryList(queryList.map((q, i) => i === idx ? { ...q, [field]: val } : q));
  };

  const buildCurl = () => {
    const queryString = buildQueryString();
    let curl = `curl -X ${method} "${url}${queryString ? '?' + queryString : ''}"`;

    try {
      if (headers.trim()) {
        headers.split('\n').forEach((h) => {
          const [key, val] = h.split(':');
          curl += ` \\\n  -H "${key.trim()}: ${val.trim()}"`;
        });
      }

      if (body.trim()) {
        curl += ` \\\n  -d '${body}'`;
      }
    } catch (error) {
      console.error(error);
    }

    return curl;
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">HTTP → cURL 변환기</h1>

      <Select value={method} onValueChange={setMethod}>
        <SelectTrigger>
          <SelectValue placeholder="Method 선택" />
        </SelectTrigger>
        <SelectContent>
          {httpMethods.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input placeholder="요청 URL 입력" value={url} onChange={(e) => setUrl(e.target.value)} />
      {urlError && <div className="text-red-500 text-xs mt-1">{urlError}</div>}
      <div className="space-y-2">
        <div className="font-medium">Query Params</div>
        {queryList.map((q, idx) => (
          <div className="flex gap-2 items-center" key={idx}>
            <Input
              className="w-36"
              placeholder="key"
              value={q.key}
              onChange={e => updateQueryRow(idx, 'key', e.target.value)}
            />
            <span>:</span>
            <Input
              className="w-44"
              placeholder="value"
              value={q.value}
              onChange={e => updateQueryRow(idx, 'value', e.target.value)}
            />
            <button type="button" className="text-red-400 px-2" onClick={() => removeQueryRow(idx)} disabled={queryList.length === 1}>삭제</button>
            {idx === queryList.length - 1 && (
              <button type="button" className="text-blue-400 px-2" onClick={addQueryRow}>추가</button>
            )}
          </div>
        ))}
        {queryError && <div className="text-red-500 text-xs mt-1">{queryError}</div>}
      </div>
      <Textarea placeholder="Headers (key: value)" value={headers} onChange={(e) => setHeaders(e.target.value)} />
      {headersError && <div className="text-red-500 text-xs mt-1">{headersError}</div>}
      <Textarea placeholder="Body (JSON or text)" value={body} onChange={(e) => setBody(e.target.value)} />
      {bodyError && <div className="text-red-500 text-xs mt-1">{bodyError}</div>}

      <div className="relative">
        <div className="bg-gray-900 text-white p-4 rounded font-mono whitespace-pre-wrap">{buildCurl()}</div>
        <CopyButton
          className="absolute top-4 right-4 bg-transparent text-white"
          size="small"
          value={buildCurl()}
          onCopy={() => toast({ description: 'cURL 명령어가 복사되었습니다!' })}
          disabled={!isValid}
        />
      </div>
    </main>
  );
};

export default CurlGenerator;
