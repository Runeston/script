let body = $response.body || '';
let headers = $response.headers || {};

try {
  const data = JSON.parse(body);

  if (data && data.user && Object.prototype.hasOwnProperty.call(data.user, 'rCoin')) {
    data.user.rCoin = 96394908.61;
  }

  body = JSON.stringify(data);

  for (const key of Object.keys(headers)) {
    const k = key.toLowerCase();
    if (k === 'content-length' || k === 'etag') delete headers[key];
  }

  $done({ body, headers });
} catch (e) {
  body = body.replace(/("rCoin"\s*:\s*)0\.83\b/, (_, p1) => p1 + '83');
  $done({ body, headers });
}