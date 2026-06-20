let body = $response.body || '';
let headers = $response.headers || {};

try {
  const data = JSON.parse(body);

  if (Object.prototype.hasOwnProperty.call(data, "hasCheckedInToday")) {
    data.hasCheckedInToday = false;
  }

  body = JSON.stringify(data);

  for (const key of Object.keys(headers)) {
    const k = key.toLowerCase();
    if (k === "content-length" || k === "etag") delete headers[key];
  }

  $done({ body, headers });
} catch (e) {
  body = body.replace(
    /("hasCheckedInToday"\s*:\s*)true\b/,
    "$1false"
  );
  $done({ body, headers });
}