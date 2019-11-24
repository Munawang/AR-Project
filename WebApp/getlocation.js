window.onload = function init(){
	var startPos;
	var geoSuccess = function(position) {
		startPos = position;
		document.getElementById('startLat').innerHTML = startPos.coords.latitude;
		document.getElementById('startLon').innerHTML = startPos.coords.longitude;
	};
	var geoError = function(error) {
		console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
	};

	var x = document.getElementById("user_latlong");
	var y = document.getElementById("user_location");

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else { 
		x.innerHTML = "Geolocation is not supported by this browser.";
	}

	function showPosition(position) {
		var u_latitude = position.coords.latitude;
		var u_longitude = position.coords.longitude;
		x.innerHTML = "Latitude: " + u_latitude + 
		"<br>Longitude: " + u_longitude;

	 //    var latlng = {u_latitude, u_longitude};
		// var geocoder = new google.maps.Geocoder;
		// geocoder.geocode({'location' latlng}, function(results, status) {
	 //    if (status === 'OK') {
	 //    	if (results[1]) {
	 //    		y.innerHTML = results[1].formatted_address;
	 //        } else {
	 //            y.innerHTML = "No results found";
	 //        }
	 //    } else {
	 //    	y.innerHTML = "Geocoder failed due to ' + status";
	 //    }\
	}
	// var latlng = new google.maps.LatLng(u_latitude, u_longitude);
	// var geocoder = geocoder = new google.maps.Geocoder();
	// geocoder.geocode({ 'latLng': latlng }, function (results, status) {
	// 	if (status == google.maps.GeocoderStatus.OK) {
	// 		if (results[1]) {
	// 			y.innerHTML = results[1].formatted_address;
	// 		}
	// 	}

};