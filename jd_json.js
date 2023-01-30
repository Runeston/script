var puimCea1 = JSON['parse']($response['body']);
if ($request['url']['indexOf']('hotWords') !== -1) {
    puimCea1['hotwords'] = {};
    puimCea1['tabs'] = {};
    delete puimCea1['abver']
}
if ($request['url']['indexOf']('hotSearchTerms') !== -1) {
    puimCea1['topData']['data'] = {};
    puimCea1['data'] = {}
}
$done({
    body: JSON['stringify'](puimCea1)
});