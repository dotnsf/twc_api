exports.twc_username = '';
exports.twc_password = '';
exports.twc_host = 'twcservice.mybluemix.net';
exports.twc_api_url = '';

if( process.env.VCAP_SERVICES ){
  var VCAP_SERVICES = JSON.parse( process.env.VCAP_SERVICES );
  if( VCAP_SERVICES && VCAP_SERVICES.weatherinsights ){
    exports.twc_username = VCAP_SERVICES.weatherinsights.credentials.username;
    exports.twc_password = VCAP_SERVICES.weatherinsights.credentials.password;
    exports.twc_host = VCAP_SERVICES.weatherinsights.credentials.host;
    exports.twc_api_url = VCAP_SERVICES.weatherinsights.credentials.url;
  }
}
