var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;

    $('.js-lat').text(crd.latitude);
    $('.js-long').text(crd.longitude);
    $('.js-acc').text(crd.accuracy + ' m');

    $.ajax({
        url: 'https://api.forecast.io/forecast/a955df0e9afe8c822ebb3adf30265fb6/' + crd.latitude + ',' + crd.longitude,
        data: {
            units : 'si'
        },
        dataType: 'jsonp',
        success: function(data) {
            console.log(data);
            $('.js-temp').text(data.currently.apparentTemperature + ' °C');
            $('.js-windspeed').text(data.currently.windSpeed + ' m/s');
        }
    });

    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        data: {
            latlng: crd.latitude + ',' + crd.longitude,
            sensor: true
        },
        success: function(data) {
            console.log(data);
            $('.js-address').text(data.results[0].formatted_address);
        }
    });
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

navigator.geolocation.getCurrentPosition(success, error, options);

// http://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=true_or_false

$('.js-custom-address').on('click', 'a', function(event) {
    event.preventDefault();

    var address = $('input', '.js-custom-address').val();

    $.ajax({
        url: 'http://maps.googleapis.com/maps/api/geocode/json',
        data: {
            address: address,
            sensor: false
        },
        success: function(data) {
            console.log(data);
            $('.js-custom-address-result').text(
                data.results[0].geometry.location.lat +
                ',' +
                data.results[0].geometry.location.lng
            );
        }
    });
});
