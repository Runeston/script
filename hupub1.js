let body = $response.body;

try {
  let obj = JSON.parse(body);

  if (obj.result) {
    obj.result.hupuDollorBalance = 967;
  }

  body = JSON.stringify(obj);
} catch (e) {
  body = body.replace(/"hupuDollorBalance"\s*:\s*80/g, '"hupuDollorBalance":967');
}

$done({ body });