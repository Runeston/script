let body = $response.body || '';
let headers = $response.headers || {};

const targetTime = "2026-06-19T15:30:00.000Z"; // 北京时间 2026-06-19 23:30:00

try {
  const data = JSON.parse(body);

  if (Object.prototype.hasOwnProperty.call(data, "checkInTime")) {
    data.checkInTime = targetTime;
  }

  if (Object.prototype.hasOwnProperty.call(data, "hasCheckedInToday")) {
    data.hasCheckedInToday = true;
  }

  body = JSON.stringify(data);

  for (const key of Object.keys(headers)) {
    const k = key.toLowerCase();
    if (k === "content-length" || k === "etag") delete headers[key];
  }

  $done({ body, headers });
} catch (e) {
  body = body.replace(
    /("checkInTime"\s*:\s*")[^"]+(")/,
    `$1${targetTime}$2`
  );
  $done({ body, headers });
}