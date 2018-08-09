(function() {
  navigator.geolocation.getCurrentPosition(success, error);

  function success(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    fetch(API_URL(lat, lng))
      .then(response => response.json())
      .then(result => {
        console.log(result);

        currentWeather(result);
      }
    )

  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

})();

