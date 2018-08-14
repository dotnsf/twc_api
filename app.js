//. app.js

var express = require( 'express' ),
    basicAuth = require( 'basic-auth-connect' ),
    cfenv = require( 'cfenv' ),
    multer = require( 'multer' ),
    bodyParser = require( 'body-parser' ),
    fs = require( 'fs' ),
    ejs = require( 'ejs' ),
    request = require( 'request' ),
    app = express();
var settings = require( './settings' );
var appEnv = cfenv.getAppEnv();

app.use( multer( { dest: './tmp/' } ).single( 'image' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
app.use( express.Router() );
app.use( express.static( __dirname + '/public' ) );

app.get( '/alertsByCountryCode', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );
  console.log( 'GET /alertsByCountryCode' );

  var countryCode = req.query.countryCode ? req.query.countryCode : null;
  if( countryCode ){
    var twc_api_url = settings.twc_api_url;
    if( !twc_api_url && settings.twc_host && settings.twc_username && settings.twc_password ){
      twc_api_url = 'https://' + settings.twc_username + ':' + settings.twc_password + '@' + settings.twc_host;
    }
    if( twc_api_url ){
      var option = {
        url: twc_api_url + '/api/weather/v1/country/' + countryCode + '/alerts.json',
        method: 'GET'
        /*
        headers: {
          'Content-Type': 'application/json'
        },
        json: data,
        */
      };
      request( option, ( err0, res0, body0 ) => {
        if( err0 ){
          console.log( 'err0' );
          console.log( err0 );
          res.status( 400 );
          res.write( JSON.stringify( { status: false, message: err0 }, 2, null ) );
          res.end();
        }else{
          body0 = JSON.parse( body0 );
          //console.log( 'body0' );
          //console.log( body0 );
          res.write( JSON.stringify( { status: true, alerts: body0.alerts }, 2, null ) );
          res.end();
        }
      });
    }else{
      res.status( 400 );
      res.write( JSON.stringify( { status: false, message: 'twc_api_url can be not URL' }, 2, null ) );
      res.end();
    }
  }else{
    res.status( 400 );
    res.write( JSON.stringify( { status: false, message: 'Parameter countryCode required.' }, 2, null ) );
    res.end();
  }
});

app.get( '/currentConditions', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );
  console.log( 'GET /currentConditions' );

  var lat = req.query.lat ? parseFloat( req.query.lat ) : null;
  var lng = req.query.lng ? parseFloat( req.query.lng ) : null;
  if( lat !== null && lng !== null ){
    var twc_api_url = settings.twc_api_url;
    if( !twc_api_url && settings.twc_host && settings.twc_username && settings.twc_password ){
      twc_api_url = 'https://' + settings.twc_username + ':' + settings.twc_password + '@' + settings.twc_host;
    }
    if( twc_api_url ){
      var option = {
        url: twc_api_url + '/api/weather/v1/geocode/' + lat + '/' + lng + '/observations.json?language=ja-JP',
        method: 'GET'
      };
      request( option, ( err0, res0, body0 ) => {
        if( err0 ){
          console.log( 'err0' );
          console.log( err0 );
          res.status( 400 );
          res.write( JSON.stringify( { status: false, message: err0 }, 2, null ) );
          res.end();
        }else{
          body0 = JSON.parse( body0 );
          //console.log( 'body0' );
          //console.log( body0 );
          res.write( JSON.stringify( { status: true, observation: body0.observation }, 2, null ) );
          res.end();
        }
      });
    }else{
      res.status( 400 );
      res.write( JSON.stringify( { status: false, message: 'twc_api_url can NOT be URL' }, 2, null ) );
      res.end();
    }
  }else{
    res.status( 400 );
    res.write( JSON.stringify( { status: false, message: 'Parameter lat and lng required.' }, 2, null ) );
    res.end();
  }
});

app.get( '/historicalData', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );
  console.log( 'GET /historicalData' );

  var lat = req.query.lat ? parseFloat( req.query.lat ) : null;
  var lng = req.query.lng ? parseFloat( req.query.lng ) : null;
  if( lat !== null && lng !== null ){
    var twc_api_url = settings.twc_api_url;
    if( !twc_api_url && settings.twc_host && settings.twc_username && settings.twc_password ){
      twc_api_url = 'https://' + settings.twc_username + ':' + settings.twc_password + '@' + settings.twc_host;
    }
    if( twc_api_url ){
      var option = {
        url: twc_api_url + '/api/weather/v1/geocode/' + lat + '/' + lng + '/observations/timeseries.json?hours=23&language=ja-JP',
        method: 'GET'
      };
      request( option, ( err0, res0, body0 ) => {
        if( err0 ){
          console.log( 'err0' );
          console.log( err0 );
          res.status( 400 );
          res.write( JSON.stringify( { status: false, message: err0 }, 2, null ) );
          res.end();
        }else{
          body0 = JSON.parse( body0 );
          //console.log( 'body0.observations' );
          //console.log( JSON.stringify( body0, null, 2 ) );
          res.write( JSON.stringify( { status: true, observations: body0.observations }, 2, null ) );
          res.end();
        }
      });
    }else{
      res.status( 400 );
      res.write( JSON.stringify( { status: false, message: 'twc_api_url can NOT be URL' }, 2, null ) );
      res.end();
    }
  }else{
    res.status( 400 );
    res.write( JSON.stringify( { status: false, message: 'Parameter lat and lng required.' }, 2, null ) );
    res.end();
  }
});


app.listen( appEnv.port );
console.log( "server stating on " + appEnv.port + " ..." );
