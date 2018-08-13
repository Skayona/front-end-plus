function fetchData(data) {
  return fetch(data)
    .then(response => response.json())
}