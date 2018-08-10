function initMap(lat, lng) {
  const content = document.querySelector('#map');
  if (!content) return;
  const pos = {
    lat,
    lng
  }
  const map = new google.maps.Map(content, {
    center: pos,
    zoom: 11,
    scrollwheel: false,
    disableDefaultUI: true
  });
  const marker = new google.maps.Marker({
    position: pos,
    map: map
  });

}