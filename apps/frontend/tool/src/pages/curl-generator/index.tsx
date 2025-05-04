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
  const [query, setQuery] = useState('');

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

  const validateQuery = (query: string) => {
    if (!query.trim()) return '';
    // key=value&key2=value2 ...
    if (!/^([\w-]+=[^&=]+)(&[\w-]+=[^&=]+)*$/.test(query.trim())) {
      return 'Query는 key=value&key2=value2 형식이어야 합니다.';
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
  const queryError = validateQuery(query);
  const headersError = validateHeaders(headers);
  const bodyError = validateBody(body, method);
  const isValid = !urlError && !queryError && !headersError && !bodyError;

  const buildCurl = () => {
    let curl = `curl -X ${method} "${url}${query ? '?' + query : ''}"`;

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
      <Input
        placeholder="Query Params (key=value&key2=value2)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {queryError && <div className="text-red-500 text-xs mt-1">{queryError}</div>}
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
