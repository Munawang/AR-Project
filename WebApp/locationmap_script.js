// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCwgPRBxoG43wyQmxPjPwWdG4fuEz-7Nkk",
    authDomain: "eatarproject.firebaseapp.com",
    databaseURL: "https://eatarproject.firebaseio.com",
    projectId: "eatarproject",
    storageBucket: "eatarproject.appspot.com",
    messagingSenderId: "437298012940",
    appId: "1:437298012940:web:b4b8e2e0ba283b0d1ddf29",
    measurementId: "G-ZYVTVS84YW"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

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
'</div><h6 id="status_marker"> &#8226;</h6></div>';
 
 window.onload = function initMap(){
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
	var btn1 = document.getElementById("camera_btn")
	var btn2 = document.getElementById("tutorial_btn")

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else { 
		x.innerHTML = "Geolocation is not supported by this browser.";
	}

	btn1.innerHTML = '<a href="camera.html"><button type="button" id="c_btn" class="btn btn-primary btn-circle btn-xl"><i class="material-icons">camera</i></button></a>';
	btn2.innerHTML = '<a href="tutorial.html"><button type="button" id="t_btn" class="btn btn-primary btn-circle btn-xl"><i class="material-icons">help_outline</i></button></a>';


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

		var u_latlng = new google.maps.LatLng(13.720278, 100.783761); //user's location
		// For test: Jinda = 13.720278, 100.783761
		// For test: Keki = 13.727822, 100.769886
		// For test: FBT = 13.722719, 100.780227
		// For test: Unavailable  = 13.731270, 100.781224 (IT KMITL)

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

		var locations = [
			['A&P ไก่ยำแซ่บ',13.7275202, 100.7694236,'zone01','keki01'], //keki (11)
			['Daily delivery KMITL',13.7278467,100.7701097,'zone01','keki02'],
			['Kinnii กินนี่',13.7278592,100.7703925,'zone01','keki03'],
			['STEAK TECHNO สเต็ก เทคโนฯ',13.727815,100.769738,'zone01','keki04'],
			['Shogun ลาดกระบัง',13.7277267,100.7702708,'zone01','keki05'],
			['ฅน 8 หน้า SUSHI BAR & RESTAURANT',13.7275384,100.7696328,'zone01','keki06'],
			['ชาชักโกอิน',13.7273668,100.769545,'zone01','keki07'],
			['ญาแฝดข้าวมันไก่ ซ.เกกี4',13.7273834,100.7694829,'zone01','keki08'],
			['มุมสบาย',13.7269879,100.7698375,'zone01','keki09'],
			['วัวล้วนๆ ไม่มีควายผสม สาขา ลาดกะบัง KMITL',13.7277895,100.7701018,'zone01','keki10'],
			['เสต็ก อิ่มเอม',13.7271134,100.7703543,'zone01','keki11'],
			['BKK Grill',13.7213184, 100.7836547,'zone02','jinda01'],//jinda (10)
			['Coffee Today คอฟฟี่ทูเดย์',13.7218673, 100.7843005,'zone02','jinda02'],
			['ICE FEELING',13.7215943, 100.7836567,'zone02','jinda03'],
			['ครัวฅนเมือง', 13.7214214, 100.7836731,'zone02','jinda04'],
			['ครัวป้าเจ๊ก', 13.7197648, 100.7837982,'zone02','jinda05'],
			['Pasta Home (พาสต้าโฮม)', 13.71779, 100.783517,'zone02','jinda06'],
			['สุกี้ดารา', 13.7221057, 100.7852154,'zone02','jinda07'],
			['R-HA (อาฮ่า)', 13.721437, 100.783842,'zone02','jinda08'],
			['เกี๊ยวกุ้งจินดา', 13.7212019, 100.7842203,'zone02','jinda09'],
			['ไอศครีมไข่แข็ง', 13.720562, 100.783833,'zone02','jinda10'],
			['ชาบู ปาร์ตี้ (Shabu party)', 13.7221422, 100.7807354,'zone03','fbt01'], //fbt (10)
			['จินตภัทร์ เบเกอรี่', 13.722068, 100.780391,'zone03','fbt02'],
			['ชา กุมารทอง' , 13.723102, 100.7804381,'zone03','fbt03'],
			['บ้านข้าวซอย', 13.7228489, 100.7807009,'zone03','fbt04'],
			['พั้น~ซ์', 13.7216955, 100.780325,'zone03','fbt05'],
			['ร้านโคม', 13.7237173, 100.7807419,'zone03','fbt06'],
			['ละมุน (Lamoon)', 13.7225579, 100.7803574,'zone03','fbt07'],
			['สุขใจเตี๋ยวไข่ต้มยำ ', 13.7228773, 100.7803227,'zone03','fbt08'],
			['แมวกินปลา@ลาดกระบัง',13.7228186, 100.7801383,'zone03','fbt09'],
			['ไก่เกาหลี อูรี ชิกเก้นท์ 우리 치킨 สาขา ลาดกระบัง',13.7220672, 100.7804952,'zone03','fbt10']
			]; //total = 31 places

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

		var maps = new google.maps.Map(document.getElementById("map"),mapOptions);
		var marker, i, info;

		// add markers to location and show window of restaurant
		for (i = 0; i < locations.length; i++) {  
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				map: maps,
				title: locations[i][0]});

			info = new google.maps.InfoWindow();
			
			google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
					var btn_marker = '<button type="button" class="btn btn-block more_btn" data-toggle="modal" data-target="#exampleModalLong"'+
					'onclick= "onclickDetail(\''+[locations[i][3],locations[i][4]]+'\')">อ่านต่อ</button>';

					info.setContent(ct1_marker+locations[i][0]+ct2_marker+btn_marker);
					info.open(maps, marker);
				
					//modal part
					var name_modal = document.getElementById("name_restaurant");
					name_modal.innerHTML = locations[i][0];
				}
			})(marker, i));
		}//loop 

		// show user's marker position
		var u_marker = new google.maps.Marker({
				position: new google.maps.LatLng(13.720278, 100.783761), //user's location
				map: maps,
				title: 'ตำแหน่งผู้ใช้',
				icon: 'pic/user_marker.png',
				animation: google.maps.Animation.BOUNCE,
		});

		u_marker.addListener('click', toggleBounce);

		function toggleBounce() {
			if (marker.getAnimation() !== null) {
				marker.setAnimation(null);
			} else {
				marker.setAnimation(google.maps.Animation.BOUNCE);
			}
		}

	} //showposition function
}; //init function 

function onclickDetail (data) {
	var type = document.getElementById("category");
	var phone = document.getElementById("cont_phone");
	var mon = document.getElementById("opening_mon");
	var tue = document.getElementById("opening_tue");
	var wed = document.getElementById("opening_wed");
	var thu = document.getElementById("opening_thu");
	var fri = document.getElementById("opening_fri");
	var sat = document.getElementById("opening_sat");
	var sun = document.getElementById("opening_sun");
	var phoneCall = document.getElementById("phone");
	//var detail_status = document.getElementById("status");
	//var marker_status = document.getElementById("status_marker");
	//var imageBox = document.getElementsByClassName("fade_textbox");
	//var reviews = document.getElementsByClassName("cont_review")

	var dataSplit = data.split(",");

	// Get data from Firebase
	var ref = firebase.database().ref();
	var database = ref.child("restaurant/"+dataSplit[0]+"/"+dataSplit[1]+"/")

	database.on("value", function(snapshot) {
		var typeRes = snapshot.child("res_type").val();
		var phoneNumber = snapshot.child("res_phonenumber").val();
		var d_mon = 'วันจันทร์: '+snapshot.child("res_opening/วันจันทร์").val()+'<br>';
		var d_tue = 'วันอังคาร: '+snapshot.child("res_opening/วันอังคาร").val()+'<br>';
		var d_wed = 'วันพุธ: '+snapshot.child("res_opening/วันพุธ").val()+'<br>';
		var d_thu = 'วันพฤหัสบดี: '+snapshot.child("res_opening/วันพฤหัสบดี").val()+'<br>';
		var d_fri = 'วันศุกร์: '+snapshot.child("res_opening/วันศุกร์").val()+'<br>';
		var d_sat = 'วันเสาร์: '+snapshot.child("res_opening/วันเสาร์").val()+'<br>';
		var d_sun = 'วันอาทิตย์: '+snapshot.child("res_opening/วันอาทิตย์").val();
		//var pics = snapshot.child("res_img").val();
		//var u_review = snapshot.child("").val();

		//Show data on webapp
		if (typeRes == "") {
			type.innerHTML = "ไม่พบข้อมูล";
		} else {
			type.innerHTML = typeRes;
		}

		if (phoneNumber == "") {
			phone.innerHTML = "ไม่พบข้อมูล";
			phoneCall.innerHTML = '<button id="notel_btn" type="button" class="btn btn-secondary btn-lg btn-block" disabled>โทร</button>';
		} else {
			phone.innerHTML = phoneNumber;
			phoneCall.innerHTML = '<a href="tel:'+phoneNumber.replace(/\s+/g, '')+'">'+
			'<button id="tel_btn" type="button" class="btn btn-lg btn-block">โทร</button></a>';
		}
		
		mon.innerHTML = d_mon;
		tue.innerHTML = d_tue;
		wed.innerHTML = d_wed;
		thu.innerHTML = d_thu;
		fri.innerHTML = d_fri;
		sat.innerHTML = d_sat;
		sun.innerHTML = d_sun;
		//imageBox.innerHTML = pics;
		//reviews.innerHTML = u_review;

	}, function (error) {
		console.log("Error: " + error.code);
	});

}

// database.child("res_opening").on("value", (snapshot) => {
// 	snapshot.forEach((child) => {
// 	  opening.innerHTML += "<li>"+child.key+ " " +snapshot.child(child.key).val()+"</li>";
// 	});
//   } 
//   )



  




  