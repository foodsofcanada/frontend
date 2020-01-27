var mapDiv = document.getElementById('map');
var map;
var markers = [];
function initMap() {
  map = new google.maps.Map(mapDiv, {
    center: { lat: 59.8478, lng: -101.8939 },
    zoom: 4,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
  });

  //Add listener
  map.addListener('click', function (event) {
      var latitude = event.latLng.lat();
      var longitude = event.latLng.lng();
      console.log(latitude + ', ' + longitude);
      placeMarker(event.latLng, map);

      // alert(latitude + ', ' + longitude);

    }); //end addListener
}

function placeMarker(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    label: '123',
    title: '[product name]',
    map: map,
  });
}

function clearMarkers(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}
