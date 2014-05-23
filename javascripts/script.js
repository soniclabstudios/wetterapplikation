var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  jQuery (".longitude").text(crd.longitude);
  jQuery (".latitude").text(crd.latitude);
  jQuery (".accuracy").text(crd.accuracy + ' meters.');

  jQuery.ajax({
  url: 'https://api.forecast.io/forecast/2440fc192add591a5ce89da2c8939529/' + crd.latitude +',' + crd.longitude,
  data: {
  units : 'si'
  },
  dataType: 'jsonp',
  success: function(data) {
  console.log(data);
  }
  });
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);