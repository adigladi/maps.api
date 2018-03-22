var map;
var roadmap = document.getElementById('roadmap');
var satellite = document.getElementById('satellite');
var plus = document.getElementById('plus');
var minus = document.getElementById('minus');
var dHuset = document.getElementById('D-huset');
var qHuset = document.getElementById('Q-huset');
var open = document.getElementById('Open');
var addLoc = document.getElementById('addLoc');

var startLocation = {lat: 59.3498092, lng: 18.0684758};
var myLocation = {};
var options = {
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;
    myLocation = {lat: crd.latitude, lng:crd.longitude}
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLocation,
        zoom: 16,
        mapTypeId: 'roadmap',
        disableDefaultUI: true
    });
    map.setTilt(45);
    newMarker(startLocation);
}

function newMarker(location){
    marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.DROP
      });
    marker.addListener('click', toggleBounce);
}

function toggleBounce(){
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    }
    else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

roadmap.onclick = function(){map.setMapTypeId('roadmap')};
satellite.onclick = function(){map.setMapTypeId('hybrid')};
plus.onclick = function(){map.setZoom(map.zoom += 1)};
minus.onclick = function(){map.setZoom(map.zoom -= 1)};
dHuset.onclick = function(){map.setCenter({lat: 59.3469488, lng: 18.0731284}); newMarker({lat: 59.3469488, lng: 18.0731284})};
qHuset.onclick = function(){map.setCenter({lat: 59.3499945, lng: 18.0662154}); newMarker({lat: 59.3499945, lng: 18.0662154})};
open.onclick = function(){map.setCenter({lat: 59.3464355, lng: 18.0723691}); newMarker({lat: 59.3464355, lng: 18.0723691})};
addLoc.onclick = function(){newMarker(map.getCenter())};
