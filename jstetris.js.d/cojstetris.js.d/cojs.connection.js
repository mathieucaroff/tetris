jst.connectionCode = jst.pushModuleCode(function () {
// Establish connection with the server and the second client.
var connection = jst.connection = {};

connection.watcherPeriod = 2000; // Look every 2s for presence of the other player
  
let clog = jst.connectionLog;

connection.getNewId = function () {
  clog("getNewId")
  return request.newid().then((id) => {
    clog(`got id: ${id}`)
    request.id = id;
    usedata.id = parseInt(id);
  });
};

connection.establish = function () {
  clog("start");
  return new Promise((resolveConnection, rejectConnection) => {

    connection.getNewId().catch(rejectConnection).then(goWait);

    function goWait () {
      clog("goWait")
      if (request.id % 2 == 1) {
        // We connected first
        request.post("").then(waitForSecondPlayer);
      } else {
        // We connected second
        request.postmydata().then(waitForFirstPlayer);
      }
    }
    
    /* If you are the first connected player */
    let watcherTimeout;
    function waitForSecondPlayer (serverData) {
      clog(`waitForSecondPlayer(serverdata=${serverData})`);
      if (serverData.length === 0 || serverData[0] !== "{" ) {
        clog(`waitForSecondPlayer > then`)
        // Our void data is still present, no one has connected
        clearTimeout(watcherTimeout);
        watcherTimeout = setTimeout(_ => {
          request.get().then(waitForSecondPlayer);
          request.poke();
        }, connection.watcherPeriod);
      } else {
        clog(`waitForSecondPlayer > else`);
        resolveConnection();
      }
    }
    
    function waitForFirstPlayer (serverData) {
      clog("waitForFirstPlayer")
      if (!usedata.differentFrom(serverData)) {
        request.get().then(waitForFirstPlayer);
      } else {
        resolveConnection();
      }
    }
  }); // End of (resolveConnection, rejectConnection)
};   // End of connection.establish
}); // End of jst.connectionCode