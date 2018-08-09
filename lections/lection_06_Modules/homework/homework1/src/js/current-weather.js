function currentWeather(c) {
  const content = document.querySelector('#current-weather');


  content.innerHTML = `
    <h1>${c.name}, ${c.sys.country}</h1>
    <p>
      <span>
        <img src="https://openweathermap.org/img/w/${c.weather[0].icon}.png" alt="${c.weather[0].description}" />
      <span>
      <span>${c.main.temp}°C</span>
    </p>
    <p>${c.weather[0].description}</p>
    <p>${getDate(c.dt).dateLocal}</p>

    <p>Вітер: ${c.wind.speed} м/сек, напрям ${c.wind.deg}°</p>
    <p>Ймовірність опадів, %: ${c.clouds.all}</p>
    <p>Тиск, мм: ${c.main.pressure}</p>
    <p>Вологість, %: ${c.main.humidity}</p>
    <p>Схід: ${getDate(c.sys.sunrise).time}</p>
    <p>Захід: ${getDate(c.sys.sunset).time}</p>
  `;

}

function getDate(timestamp) {
  let date = new Date();
  date.setTime(timestamp*1000);
  return {
    date,
    dateLocal: date.toLocaleDateString(),
    time: date.toLocaleTimeString()
  }
}