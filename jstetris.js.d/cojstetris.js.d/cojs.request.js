jst.requestCode = jst.pushModuleCode(function () {
// Operates communication with the server, thus the second player.
var request = jst.request = {};

let rlog = jst.requestLog;

request.watcherPeriod = 2000; // 2 seconds

request.getPerPostRatio = 4;

request.id = "";
  
/* Proposed url protocols */
request.newid = function () {
  return http.request("!/newid");
};

request.get = function () {
  return http.codedRequest("!/get", "");
};

request.getthedata = function () {
  return http.codedRequest("!/get", "").then(usedata.setData);
};

request.ifid = function (func) {
  if (request.id) {
    return func();
  } else {
    let promise = Promirequest.reject("No id");
    return promise;
  }
}

request.poke = function () {
  return request.ifid(_ => http.request(`!/poke/${request.id}`));
};

request.post = function (data) {
  return request.ifid(_ => http.codedRequest(`!/post/${request.id}/`, data));
};

request.postmydata = function () {
  return request.post(usedata.getData());
};
  
}); // End of jst.request