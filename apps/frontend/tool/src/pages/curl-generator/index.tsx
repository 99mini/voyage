import { useState } from 'react';

import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from '@packages/vds';

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

const CurlGenerator = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState('');
  const [body, setBody] = useState('');
  const [query, setQuery] = useState('');

  const buildCurl = () => {
    let curl = `curl -X ${method} "${url}${query ? '?' + query : ''}"`;

    if (headers.trim()) {
      headers.split('\n').forEach((h) => {
        const [key, val] = h.split(':');
        curl += ` \\\n  -H "${key.trim()}: ${val.trim()}"`;
      });
    }

    if (body.trim() && method !== 'GET') {
      curl += ` \\\n  -d '${body}'`;
    }

    return curl;
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(buildCurl());
    alert('cURL 명령어가 복사되었습니다!');
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
      <Input
        placeholder="Query Params (key=value&key2=value2)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Textarea placeholder="Headers (key: value)" value={headers} onChange={(e) => setHeaders(e.target.value)} />
      <Textarea placeholder="Body (JSON or text)" value={body} onChange={(e) => setBody(e.target.value)} />

      <div className="bg-gray-900 text-white p-4 rounded font-mono whitespace-pre-wrap">{buildCurl()}</div>

      <Button onClick={copyToClipboard}>cURL 복사</Button>
    </main>
  );
};

export default CurlGenerator;
