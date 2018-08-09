const API = 'http://api.openweathermap.org/data/2.5/';
const KEY = '85e0b4eb081420f7687f1e11d1392b9e';
const UNITS = 'metric';
const LANG = 'ua';

function API_URL(lat, lng) {
  return `${API}weather?lat=${lat}&lon=${lng}&appid=${KEY}&units=${UNITS}&lang=${LANG}`;
}

