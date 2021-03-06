function timetreeGetUpcomingEventsByName(name) {
  var id = timetreeGetCalendarIdByName(name);
  return timetreeGetUpcomingEvents(id);
}

function timetreeGetUpcomingEvents(id) {
  var url = 'https://timetreeapis.com/calendars/' + id + '/upcoming_events?timezone=Asia/Tokyo';
  var method = 'GET'; 
  var payload = '';
  return timetreeAPI(url, method, payload);
}

function timetreeGetCalendars() {
  var url = 'https://timetreeapis.com/calendars';
  var method = 'GET';
  var payload = '';
  return timetreeAPI(url, method, payload);
}

function timetreeGetCalendarIdByName(name) {
  var response = timetreeGetCalendars();
  var calendars = JSON.parse(response).data;
  
  var calendar = calendars.filter(function(data){
    return data.attributes.name.toString() === name;
  });
  return calendar[0].id;
}

function timetreeAPI(url, method, payload) {
 var accessToken = PropertiesService.getScriptProperties().getProperty('timetree_personal_access_token');
 var headers = {
   'Authorization': 'Bearer '+ accessToken
 };
 var options = {
   'method': method,
   'headers': headers,
   'payload': payload
 };
 
 var response = UrlFetchApp.fetch(url, options);
 return response;
}