(function() {
  navigator.geolocation.getCurrentPosition(success, error);

  function success(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    fetch(API_URL(lat, lng))
      .then(response => response.json())
      .then(result => currentWeather(result))
      .then(() => initMap(lat, lng))
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

})();

