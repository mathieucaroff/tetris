jst.superviserCode = jst.pushModuleCode(function () {
// Determine how code interracts with server
var superviser = jst.superviser = {};

superviser.connectionLoop = function () {
  connection.establish().then(superviser.alternate, superviser.connectionLoop);
};
jst.init.execution.push(superviser.connectionLoop);

superviser.alernationPeriod = 1000
superviser.alernationPeriodVariation = 1000
superviser.lastmethod = "";
superviser.alternate = function () {
  jst.log("alternate");
  if (superviser.lastmethod === "post") {
    request.getthedata();
    superviser.lastmethod = "get";
  } else {
    request.postmydata();
    superviser.lastmethod = "post";
  }
  setTimeout(superviser.alternate, superviser.alernationPeriod + Math.random()*superviser.alernationPeriodVariation);
};

}); // End of jst.superviserCode