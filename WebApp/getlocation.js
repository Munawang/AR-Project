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
var w = document.getElementById("check_user");
var z = document.getElementById("forward_btn");

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(showPosition);
} else { 
	x.innerHTML = "Geolocation is not supported by this browser.";
}

 var zone_area = new google.maps.LatLngBounds(
 		new google.maps.LatLng(13.7164414197085, 100.7821680197085), //พาสต้าโฮม
 		new google.maps.LatLng(13.7234142302915, 100.7865633802915) // สุกี้ดารา	
 		);

 var u_latlng = new google.maps.LatLng(13.71779, 100.783517);
 var check_within = zone_area.contains(u_latlng);


function showPosition(position) {
	var u_latitude = position.coords.latitude;
	var u_longitude = position.coords.longitude;
	x.innerHTML = "ค่าละติจูด: " + u_latitude + 
	"<br>ค่าลองจิจูด: " + u_longitude;

	var url_api = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+
	u_latitude+","+u_longitude+"&sensor=true&key=AIzaSyDvxzqr4qQKxIE7llXkPfkpiaMa8amsixo&language=th";

	$.get({
		url : url_api,
		success: function(data){
			console.log(data);
			y.innerHTML = data.results[1].formatted_address;
			if (check_within == true) {
				w.innerHTML = "อยู่ในพื้นที่ให้บริการในขณะนี้";
			}else{
				w.innerHTML = "ไม่อยู่ในพื้นที่ให้บริการในขณะนี้";
			}
			z.innerHTML = '<a href="zone.html" class="btn btn-info btn-block">ต่อไป</a>';
		}
	})

} // showposition function
}; //init function