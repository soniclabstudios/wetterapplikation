function success(pos) {
      var crd = pos.coords;

      jQuery(".longitude").text(crd.longitude);
      jQuery(".latitude").text(crd.latitude);
      jQuery(".accuracy").text(crd.accuracy + ' m');


      jQuery.ajax({
          url: 'https://api.forecast.io/forecast/a4f100023b169ab8debbbd8f37eedb85/' + crd.latitude + ',' + crd.longitude,
          data: {
              units: 'si'
          },
          dataType: 'jsonp',
          success: function(data) {
                jQuery(".temperature").text(data.currently.apparentTemperature + ' °C');
                jQuery(".windspeed").text(data.currently.windSpeed + ' m/h');
              console.log(data);
          }
      });
}
;

function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
}
;

navigator.geolocation.getCurrentPosition(success, error, options);