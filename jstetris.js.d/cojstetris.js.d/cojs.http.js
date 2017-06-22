jst.httpCode = jst.pushModuleCode(function () {
// Defines handy functions to interract with dynamic remote ressources.
// Utilitary module

let http = jst.http = {};
http.request = function (url) {
  let obj = {};
  httpreq = new XMLHttpRequest();
  httpreq.addEventListener("load", function () {
    if (httpreq.readyState === XMLHttpRequest.DONE) {
      obj.callback(httpreq.responseText);
    }
  });
  httpreq.open("GET", url);
  httpreq.send();
  return obj;
};

});