function currentWeather(c) {
  const content = document.querySelector('#home-page');
  if (!content) return;
  content.innerHTML = `
    <div class="container current-weather-wrap">
      <section id="current-weather" class="section current-weather">
        <h1 class="h1 current-weather__title">${c.name}, ${c.sys.country}
          <time class="time" datetime="${getDate(c.dt).datetime}">${getDate(c.dt).dateLocal}</time>
        </h1>
        <div class="current-weather__main weather-main">
          <figure class="weather-main__img">
            <p>
              <img src="https://openweathermap.org/img/w/${c.weather[0].icon}.png" alt="${c.weather[0].description}" />
            </p>
            <figcaption>${c.weather[0].description}</figcaption>
          </figure>

          <p class="weather-main__temp">${c.main.temp.toFixed(0)}°C</p>
        </div>

        <table class="current-weather__details">
          <tr>
            <td>Вітер</td>
            <td>${c.wind.speed} м/сек, напрям ${c.wind.deg}°</td>
          </tr>
          <tr>
            <td>Ймовірність опадів</td>
            <td>${c.clouds.all}%</td>
          </tr>
          <tr>
            <td>Тиск</td>
            <td>${c.main.pressure} мм рт. ст.</td>
          </tr>
          <tr>
            <td>Вологість</td>
            <td>${c.main.humidity}%</td>
          </tr>
          <tr>
            <td>Схід</td>
            <td>${getDate(c.sys.sunrise).time}</td>
          </tr>
          <tr>
            <td>Захід</td>
            <td>${getDate(c.sys.sunset).time}</td>
          </tr>
        </table>
      </section>
      <div class="section">
        <div id="map" class="map">

        </div>
      </div>
    </div>
  `;
}

function getDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return {
    dateLocal: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
    datetime: date.toISOString()
  }
}