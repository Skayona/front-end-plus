(function () {
  navigator.geolocation.getCurrentPosition(success, error);

  async function success(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const API_URLS = [{
      data: fetchData(WEATHER_API_URL(lat, lng)),
      type: 'weather'
    }, {
      data: fetchData(EVENTS_API_URL),
      type: 'events'
    }];

    const DATA_LIST = new Map();
    for (let item of API_URLS) {
      DATA_LIST.set(item.type, await item.data);
    }

    const WEATHER = DATA_LIST.get('weather');
    const EVENTS = DATA_LIST.get('events');

    currentWeather(WEATHER);
    initMap(lat, lng);
    eventsFilter(WEATHER, EVENTS.data.list);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

})();