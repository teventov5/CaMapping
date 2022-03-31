let map;
var infoWindowLatLang;
function initMap() {
  //setting the map starting position and zoom.
  map = new google.maps.Map( document.getElementById( 'map' ), {
    center: {
      lat: 32.01345951663715,
      lng: 34.77160817977713
    },
    zoom: 7
  });

  //setting a center button that will get us back to the begininng position.

const centerButton = document.querySelector( '#bringToCenter' );

centerButton.addEventListener( 'click', function( e ) {
	e.preventDefault();
	map.setCenter({
    lat: 32.01345951663715,
    lng: 34.77160817977713
	});
});


//getting coaordinates from pressing on screen.


map.addListener( 'click', function( mapsMouseEvent ) {
	if ( infoWindowLatLang ) infoWindowLatLang.close();

	infoWindowLatLang = new google.maps.InfoWindow({
		position: mapsMouseEvent.latLng
	});

	infoWindowLatLang.setContent( mapsMouseEvent.latLng.toString() );
	infoWindowLatLang.open( map );
});



//adding a pin option so a user can pin a specific location.

function MarkerControl( controlDiv, map ) {
	const controlUI = document.createElement( 'div' );
	controlUI.style.backgroundColor = '#fff';
	controlUI.style.border = '2px solid #fff';
	controlUI.style.borderRadius = '3px';
	controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.margin = '10px';
	controlDiv.appendChild( controlUI );

	const controlText = document.createElement( 'img' );
	controlText.style.padding = '5px';
	controlText.title = 'Click to add a Marker';
	controlText.src = 'https://maps.google.com/mapfiles/ms/icons/red-pushpin.png';
	controlUI.appendChild( controlText );

	controlUI.addEventListener( 'click', function() {
    new google.maps.Marker({
  			position: infoWindowLatLang.position,
  			map: map
  		});
	});
}



const markerControlDiv = document.createElement( 'div' );
const markerControl = new MarkerControl( markerControlDiv, map );
markerControlDiv.index = 1;
map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push( markerControlDiv );

}
