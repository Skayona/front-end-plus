class DataService {
  static fetch(url) {
    return fetch(url, {
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(response => response.json())
  }
}
module.exports = DataService;