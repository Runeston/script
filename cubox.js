*******************************

[rewrite_local]

^https:\/\/cubox\.(pro|cc)\/c\/api\/user(Info|Pay) url script-response-body https://raw.githubusercontent.com/Runeston/script/main/cubox.js

[mitm] 

hostname = cubox.cc

*******************************/

var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

const vip = '/userInfo';


if (url.indexOf(vip) != -1) {
    obj.data.level = 1;
    obj.data.expireTime = "2099-09-12T23:50:23+08:00";
    obj.data.nickName = "runestone";
    obj.data.thirdNickName = "runestone";
    obj.data.isExpire = false;
    obj.data.active = true;
    obj.data.payTime = 1660006006;

	body = JSON.stringify(obj);
}


$done({body});
