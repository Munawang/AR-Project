 window.onload = function init(){
 	var startPos;
 	var geoSuccess = function(position) {
 		startPos = position;
 	};
 	var geoError = function(error) {
 		console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
};

var x = document.getElementById("header1");
var y = document.getElementById("header2");
var z = document.getElementById("btn")

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(showPosition);
} else { 
	x.innerHTML = "Geolocation is not supported by this browser.";
} 

function showPosition(position) {
	var u_latitude = position.coords.latitude;
	var u_longitude = position.coords.longitude;


	var zone_jinda = new google.maps.LatLngBounds(
 		new google.maps.LatLng(13.7164414197085, 100.7821680197085), //พาสต้าโฮม
 		new google.maps.LatLng(13.7234142302915, 100.7865633802915) // สุกี้ดารา	
 		);
	var zone_keki = new google.maps.LatLngBounds(
 		new google.maps.LatLng(13.7260196197085, 100.7685153197085), //ชาชักโกอิน+มุมสบาย
 		new google.maps.LatLng(13.7292078802915, 100.7716893802915) //kinnii 
 		);
	var zone_fbt = new google.maps.LatLngBounds(
 		new google.maps.LatLng(13.7203452697085, 100.7789322697085), //พั้นซ์
 		new google.maps.LatLng(13.7250487802915, 100.7821217802915) // โคม
 		);

	var u_latlng = new google.maps.LatLng(13.720799, 100.784680); //user's location
	var check_jinda = zone_jinda.contains(u_latlng);
	var check_keki = zone_keki.contains(u_latlng);
	var check_fbt = zone_fbt.contains(u_latlng);	

	if (check_jinda == true) {
		x.innerHTML = '<div id="check_header" style="background-color: green;">คุณกำลังอยู่ในพื้นที่ให้บริการ</div>';
		y.innerHTML = '<div id="zone_header">โซนจินดานิเวศน์</div>';
	} else if(check_keki == true){
		x.innerHTML = '<div id="check_header" style="background-color: green;">คุณกำลังอยู่ในพื้นที่ให้บริการ</div>';
		y.innerHTML = '<div id="zone_header">โซนเกกีงาม</div>';
	} else if(check_fbt == true){
		x.innerHTML = '<div id="check_header" style="background-color: green;">คุณกำลังอยู่ในพื้นที่ให้บริการ</div>';
		y.innerHTML = '<div id="zone_header">โซนอพาร์ทเมนต์ FBT</div>';			
	} else{
		y.innerHTML = '<div id="check_header" style="background-color: red;">คุณไม่อยู่ในพื้นที่ให้บริการในขณะนี้</div>';
	}

z.innerHTML = '<form action="tutorial.html"><input id="tutorial_btn" type="image" src="pic/info.png" alt="Submit" width="48" height="48"></form>';

	var locations = [
	['สุกี้ดารา', 13.7221057, 100.7852154],
	['Pasta Home (พาสต้าโฮม)', 13.71779, 100.783517],
	['เกี๊ยวกุ้งจินดา', 13.7212019, 100.7842203],
	['Coffee Today คอฟฟี่ทูเดย์',13.7218673, 100.7843005],
	['BKK Grill',13.7213184, 100.7836547],
	['ICE FEELING',13.7215943, 100.7836567],
	['ครัวฅนเมือง', 13.7214214, 100.7836731],
	['ครัวป้าเจ๊ก', 13.7197648, 100.7837982],
	['R-HA (อาฮ่า)', 13.721437, 100.783842],
	['ไอศครีมไข่แข็ง', 13.720562, 100.783833],
	['ชาบู ปาร์ตี้ (Shabu party)', 13.7221422, 100.7807354],
	['', , ],
	['', , ],
	['', , ],
	['', , ],
	['', , ],
	['', , ],
	['', , ],
	['', , ],
	['', , ],
	['', , ],
	['', , ],
	['', , ],
	['', , ],
	['', , ],
	['', , ],
	['', , ],
	['', , ],
	['', , ],
	];

	var mapOptions = {
		center: u_latlng,
		zoom: 16.3,
		mapTypeId: 'terrain',
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: true,
		fullscreenControl: false,
		streetViewControl: false,
	}

	var maps = new google.maps.Map(document.getElementById("map"),mapOptions);

	var marker, i, info;

	for (i = 0; i < locations.length; i++) {  

		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: maps,
			title: locations[i][0]
		});

		info = new google.maps.InfoWindow();

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				info.setContent('<div style="font-size: 18px;color: purple";text-align:center>'+locations[i][0]+'</div>'
					+'<button type="button" class="btn edit_reslist" data-toggle="modal" data-target="#exampleModalLong">อ่านต่อ</button>');
				info.open(maps, marker);
			}
		})(marker, i));

	}

	var u_marker = new google.maps.Marker({
		position: new google.maps.LatLng(13.720799, 100.784680),
		map: maps,
		title: 'ตำแหน่งผู้ใช้',
		animation: google.maps.Animation.BOUNCE,
	});
	u_marker.addListener('click', toggleBounce);

} // showposition function

function toggleBounce() {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}
}; //init function
