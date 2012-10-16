function doGet() {
  // 送信画面表示
  var tpl = HtmlService.createTemplateFromFile('index.html');
  return tpl.evaluate();
}

function sendGCMMessage(form) {
  var url = "https://android.googleapis.com/gcm/send";
  var apiKey = "api_key";

  // 登録id取得
  var db = ScriptDb.getMyDb();
  var registrationIds = new Array();
  var result = db.query({});
  var sendCount = result.getSize();
  while(result.hasNext()) {
    var data = result.next();
    var registrationId = data.registrationId;
    var headers = {
      "Content-Type": "application/json", 
      "Authorization": "key=" + apiKey
    };
    var payload = {
      "registration_id": registrationId, 
      "data.message": form.text
    };
    var params = {
      headers: headers, 
      method: "post",
      payload: payload
    };

    // GCM送信
    var response = UrlFetchApp.fetch(url, params);
  }
  return {message: "send completed: " + sendCount};
}
