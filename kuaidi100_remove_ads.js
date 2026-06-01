/*
快递100去广告/去悬浮提示 - Quantumult X
*/

const url = $request.url;
let body = $response.body || "";

function clearAdObject(o) {
  if (!o || typeof o !== "object") return o;

  const zeroKeys = [
    "headad", "footad", "adsplash", "adbanner", "adposition",
    "adIsConsumable", "coupon", "quickLoginStatus",
    "uMengQuickLoginStatus", "jiGuangQuickLoginStatus",
    "orderImportToHomePage"
  ];
  zeroKeys.forEach(k => { if (k in o) o[k] = 0; });

  if ("pushSetShowAgainTime" in o) o.pushSetShowAgainTime = 315360000000;
  if ("adShowAgainTime" in o) o.adShowAgainTime = 315360000000;

  const emptyArrayKeys = [
    "adsapp_homepage_ticket_pop",
    "adsapp_index_pop_banner",
    "adsapp_jijianye_top_banner",
    "adsapp_activity_ad_array",
    "adsharmonyquickapp_map_pop_up_banner"
  ];
  emptyArrayKeys.forEach(k => { if (k in o) o[k] = []; });

  const nullKeys = ["adshongbao"];
  nullKeys.forEach(k => { if (k in o) o[k] = null; });

  const blankKeys = [
    "index_banner", "me_banner", "index_banner_shadow",
    "query_news_logo", "shrinkimage", "bgimage"
  ];
  blankKeys.forEach(k => { if (k in o && typeof o[k] === "string") o[k] = ""; });

  return o;
}

function removePromoItemsFromArray(arr) {
  if (!Array.isArray(arr)) return arr;
  return arr.filter(item => {
    const s = JSON.stringify(item || {});
    if (/showType["']?\s*:\s*["']?广告/.test(s)) return false;
    if (/appads\/20\d{10,}|redpacket|share-activity|igame\.qq\.com|yi\.biandaotec\.cn/i.test(s)) return false;
    return true;
  });
}

try {
  let obj = JSON.parse(body);

  if (/\/mai-express\/phone\/auth\/dynamic\/config/.test(url)) {
    obj.data = { company: "", beta: false };

  } else if (/\/mobile\/mobileapi\.do/.test(url)) {
    const looksLikeProfile =
      obj && (obj._id === "platform_all" ||
      "adsplash" in obj ||
      "adsapp_index_pop_banner" in obj ||
      "pushSetShowAgainTime" in obj);

    if (looksLikeProfile) obj = clearAdObject(obj);

  } else if (/\/apicenter\/kdmkt\.do/.test(url)) {
    const dataStr = JSON.stringify(obj.data || {});
    if (/index_activity_float_banner|share-activity|img-share-activity|appads\/20\d{10,}|showType/i.test(dataStr)) {
      obj.data = Array.isArray(obj.data) ? [] : null;
    }

  } else if (/\/apicenter\/kdmkt\.dox/.test(url)) {
    if (Array.isArray(obj.data)) obj.data = removePromoItemsFromArray(obj.data);
    if (Array.isArray(obj.gridlist)) obj.gridlist = removePromoItemsFromArray(obj.gridlist);
    if (Array.isArray(obj.cardlist)) obj.cardlist = removePromoItemsFromArray(obj.cardlist);

  } else if (/\/apicenter\/xcx\.dox/.test(url)) {
    if (obj.data) {
      if (Array.isArray(obj.data.menuList)) obj.data.menuList = removePromoItemsFromArray(obj.data.menuList);
      if (Array.isArray(obj.data.secondMenuList)) obj.data.secondMenuList = removePromoItemsFromArray(obj.data.secondMenuList);
    }
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({ body });
}