jst.serverExchangeCode = jst.pushModuleCode(function () {
// Operates communication with the server, thus the second player.

// se: Sever Exchange
let se = jst.se = {};
let http = jst.http;
  
  
se.watcherPeriod = 2000; // 2 seconds
  
se.getPerPostRatio = 4;

se.id = "";

se.start = new Hook();
jst.init.execution.push(se.start.run);
  
/* Proposed url protocols */
se.newid = function () {
  return http.request("!/newid");
};

se.get = function () {
  obj = {};
  http.request("!/get").callback = function (srvURIdata) {
    obj.callback(decodeURI(srvURIdata));
  }
  return obj;
};

se.poke = function () {
  if (se.id) {
    return http.request(`!/poke/${se.id}`);
  } else {
    return {};
  }
};

se.post = function (data) {
  if (se.id) {
    obj = {};
    let req = http.request(`!/post/${se.id}/${encodeURI(data)}`);
    req.callback = function (srvURIdata) {
      obj.callback(decodeURI(srvURIdata));
    }
    return obj;
  } else {
    return {};
  }
}



/* Connection process */
se.getNewId = function () {
  se.newid().callback = function (id) {
    se.id = id
    se.getNewId.callback();
  };
};
se.start.after.push(se.getNewId);

/* If you are the first connected player */
se.goWaitSecondPlayer = function () {
  if (parseInt(se.id) % 2 == 0) {// Here we actually are the second connected player
    se.goWaitFirstPlayer();
  }
  se.post("").callback = se.waitSecondPlayer;
}
se.getNewId.callback = se.goWaitSecondPlayer;

se.waitSecondPlayer = function (serverData) {
  clearTimeout(se.waitSecondPlayer.timeout);
  if (serverData == "") {
    // Our void data is still present, no one has connected
    se.waitSecondPlayer.timeout = setTimeout(function () {
      se.get().callback = se.waitSecondPlayer;
      se.poke();
    }, se.watcherPeriod);
  } else {
    // Some data has been written by someone else !
    se.exchangeData();
  }
}

se.goWaitFirstPlayer = function () {
  se.post(usedata.getData()).callback = se.waitFirstPlayer;
};

/* If you are the second connected player */
se.waitFirstPlayer = function () {
  se.get().callback = function (serverData) {
    if (serverData != usedata.saved) {
      se.exchangeData();
    } else {
      se.waitFirstPlayer();
    }
  }
};

/* Running game */
se.exchangeData = function () {
  let req;
  if (se.exchangeData.loop++ > se.getPerPostRatio) {
    se.exchangeData.loop = 0;
    req = se.post(usedata.getData());
  } else {
    req = se.get();
  };
  req.callback = function (serverData) {
    usedata.setData(serverData);
  };
  se.exchangeData.loop = se.getPerPostRatio + 1;
};
  
}); // End of jst.serverExchangeCode