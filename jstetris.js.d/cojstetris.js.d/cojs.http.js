jst.httpCode = jst.pushModuleCode(function () {
// Defines handy functions to interract with dynamic remote ressources.
// Utilitary module

var http = jst.http = {};
let hlog = jst.httpLog;

http.request = function (url) {
  hlog(url)
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "text";
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
};

/**
 * http.codedRequest
 * Use encodeURI and decodeURI on the data sent and received through URL
 * @param urldata {string} to be encoded and append to the url.
 */
http.codedRequest = function (url, urldata) {
  if (urldata) {
    url +=  encodeURI(urldata)
  }
  return http.request(url).then(data => decodeURI(data));
};
/*<*
http.codedRequest = function (url, urldata) {
  return new Promise((resolve, reject) => {
    if (urldata) {
      url += encodeURI(urldata)
    }
    http.request(url).then(data => resolve(decodeURI(data)), reject);
  });
};/*>*/
});