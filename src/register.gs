function doPost(form){
  var functionType = form.parameter.functionType;
  var registrationId = form.parameter.registrationId;
  var model = form.parameter.model;

  var outputJson = {};
  if(functionType == "register") {
    var stored = register(registrationId, model);
    outputJson = stored.toJson();

  } else if(functionType == "unregister") {
    unregister(registrationId);
    outputJson = {result : "unregister"};

  } else if(functionType == "unregisterAll") {
    unregisterAll();
    outputJson = {result : "unregister all"};

  } else {
    return;
  }

  var output = ContentService.createTextOutput();
  output.setContent(Utilities.jsonStringify(outputJson));
  return output;
}

function register(registrationId, model) {
  // 既存id登録解除
  unregister(registrationId);

  // id登録
  var registerData = {
    registrationId: registrationId, 
    model: model
  };
  var db = ScriptDb.getMyDb();
  var stored = db.save(registerData);

  return stored;
}

function unregister(registrationId) {
  var db = ScriptDb.getMyDb();
  var result = db.query({registrationId: registrationId});
  while(result.hasNext()) {
    var obj = result.next();
    db.remove(obj);
  }
}

function unregisterAll() {
  var db = ScriptDb.getMyDb();
  var result = db.query({});
  while(result.hasNext()) {
    var obj = result.next();
    db.remove(obj);
  }
}
