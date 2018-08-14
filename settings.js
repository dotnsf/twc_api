exports.twc_username = '';
exports.twc_password = '';
exports.twc_host = 'twcservice.mybluemix.net';
exports.twc_api_url = '';

if( process.env.VCAP_SERVICES ){
  var VCAP_SERVICES = JSON.parse( process.env.VCAP_SERVICES );
  if( VCAP_SERVICES && VCAP_SERVICES.cloudantNoSQLDB ){
    exports.twc_username = VCAP_SERVICES.cloudantNoSQLDB.credentials.username;
    exports.twc_password = VCAP_SERVICES.cloudantNoSQLDB.credentials.password;
    exports.twc_host = VCAP_SERVICES.cloudantNoSQLDB.credentials.host;
    exports.twc_api_url = VCAP_SERVICES.cloudantNoSQLDB.credentials.url;
  }
}
