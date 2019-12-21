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

	var u_latlng = new google.maps.LatLng(13.722719, 100.780227); //user's location
	// For test: Jinda = 13.720278, 100.783761
	// For test: Keki = 13.727822, 100.769886
	// For test: FBT = 13.722719, 100.780227
	// For test: Unavailable  = 13.731270, 100.781224 (IT KMITL) | ใช้ตัวแปลตำแหน่งผู้ใช้

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

//z.innerHTML = '<form action="tutorial.html"><input id="tutorial_btn" type="image" src="pic/info.png" alt="Submit" width="48" height="48"></form>';

var locations = [
	['สุกี้ดารา', 13.7221057, 100.7852154],//jinda (10)
	['Pasta Home (พาสต้าโฮม)', 13.71779, 100.783517],
	['เกี๊ยวกุ้งจินดา', 13.7212019, 100.7842203],
	['Coffee Today คอฟฟี่ทูเดย์',13.7218673, 100.7843005],
	['BKK Grill',13.7213184, 100.7836547],
	['ICE FEELING',13.7215943, 100.7836567],
	['ครัวฅนเมือง', 13.7214214, 100.7836731],
	['ครัวป้าเจ๊ก', 13.7197648, 100.7837982],
	['R-HA (อาฮ่า)', 13.721437, 100.783842],
	['ไอศครีมไข่แข็ง', 13.720562, 100.783833],
	['ชาบู ปาร์ตี้ (Shabu party)', 13.7221422, 100.7807354], //fbt (11)
	['จินตภัทร์ เบเกอรี่', 13.722068, 100.780391],
	['ชา กุมารทอง' , 13.723102, 100.7804381],
	['พั้น~ซ์', 13.7216955, 100.780325],
	['บ้านข้าวซอย', 13.7228489, 100.7807009 ],
	['ร้านโคม', 13.7237173, 100.7807419],
	['ละมุน (Lamoon)', 13.7225579, 100.7803574],
	['แมวกินปลา@ลาดกระบัง',13.7228186, 100.7801383],
	['สุขใจเตี๋ยวไข่ต้มยำ ', 13.7228773, 100.7803227],
	['ไก่เกาหลี อูรี ชิกเก้นท์ 우리 치킨 สาขา ลาดกระบัง',13.7220672, 100.7804952],
	['จุดสามจุด', 13.7228193, 100.7801028], 
	['A&P ไก่ยำแซ่บ',13.7275202, 100.7694236], //keki (13)
	['Daily delivery KMITL',13.7278467,100.7701097],
	['Kinnii กินนี่',13.7278592,100.7703925],
	['Shogun ลาดกระบัง',13.7277267,100.7702708],
	['ฅน 8 หน้า SUSHI BAR & RESTAURANT',13.7275384,100.7696328],
	['ชาชักโกอิน',13.7273668,100.769545],
	['ญาแฝดข้าวมันไก่ ซ.เกกี4',13.7273834,100.7694829],
	['มุมสบาย',13.7269879,100.7698375],
	['วัวล้วนๆ ไม่มีควายผสม สาขา ลาดกะบัง KMITL',13.7277895,100.7701018],
	['หมูทอดป้าจุก',13.7270951,100.7702075],
	['อิ่มแปล้ แฮปปี้คัพ',13.727737,100.769764],
	['เสต็ก อิ่มเอม',13.7271134,100.7703543],
	['STEAK TECHNO สเต็ก เทคโนฯ',13.727815,100.769738]
	]; //total = 34 places

	var mapOptions = {
		center: u_latlng,
		zoom: 17,
		mapTypeId: 'terrain',
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: true,
		fullscreenControl: false,
		streetViewControl: false,
	}

	
	var ct1_marker ='<div class="row">'+
	'<div class="col-3">'+
	'<img id="icon_marker" src="pic/coffee-cup.png">'+
	'</div>'+
	'<div class="col-9">'+
	'<div id="grid_marker" class="row">'+
	'<div class="col-sm-6">'+
	'<h4 class="modal-title" id="name_marker">';

	var ct2_marker = '</h4>'+
	'</div>'+
	'<div class="col-sm-6" id="header_marker">'+
	'<div class="mk_rating">'+            
	'<img class="mk_star" src="pic/get_star.png">'+
	'<img class="mk_star" src="pic/get_star.png">'+
	'<img class="mk_star" src="pic/get_star.png">'+
	'<img class="mk_star" src="pic/get_star.png">'+
	'<img class="mk_star" src="pic/nopoint.png">'+
	'<h6 class="total_marker">4.0</h6>'+
	'</div>'+
	'</div>'+
	'</div><h6 id="status_marker"> &#8226; เปิดอยู่ในขณะนี้</h6></div>';

	var btn_marker = '<button type="button" class="btn btn-block more_btn" data-toggle="modal" data-target="#exampleModalLong">อ่านต่อ</button>';

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
				info.setContent(ct1_marker+locations[i][0]+ct2_marker+btn_marker);
				info.open(maps, marker);
				
				//modal part
				var name_modal = document.getElementById("name_restaurant");
				name_modal.innerHTML = locations[i][0];
			}
		})(marker, i)); 
	} 

var u_marker = new google.maps.Marker({
		position: new google.maps.LatLng(13.722719, 100.780227), //user's location
		map: maps,
		title: 'ตำแหน่งผู้ใช้',
		icon: 'pic/user_marker.png',
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