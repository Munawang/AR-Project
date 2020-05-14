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
ref = firebase.database().ref();

var ct1_marker = '<div class="row">' +
    '<div class="col-3">' +
    '<div id="iconMarker"></div></div>' +
    '<div class="col-9">' +
    '<div id="grid_marker" class="row">' +
    '<div class="col-sm-6">' +
    '<h4 class="modal-title" id="name_marker">';

var ct2_marker = '</h4>' +
    '</div>' +
    '<div class="col-sm-6" id="header_marker">' +
    '<div id="mk_rating">' +
    '</div>' +
    '<h6 id="total_marker"></h6>' +
    '</div>' +
    '</div><h6 id="status_marker"> &#8226;</h6></div>';

window.onload = function initMap() {
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

    //btn1.innerHTML = '<a href="index-multiple2.html"><button type="button" id="c_btn" class="btn btn-primary btn-circle btn-xl"><i class="material-icons">camera</i></button></a>';
    btn2.innerHTML = '<a href="tutorial-new.html"><button type="button" id="t_btn" class="btn btn-primary btn-circle btn-xl"><i class="material-icons">help_outline</i></button></a>';


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

        var u_latlng = new google.maps.LatLng(13.727822, 100.769886); //**user's location
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
            btn1.innerHTML = '<a href="jinda-ar.html"><button type="button" id="c_btn" class="btn btn-primary btn-circle btn-xl"><i class="material-icons">camera</i></button></a>';
        } else if (check_keki == true) {
            x.innerHTML = '<div id="check_header" style="background-color: green;">คุณกำลังอยู่ในพื้นที่ให้บริการ</div>';
            y.innerHTML = '<div id="zone_header">โซนเกกีงาม</div>';
            btn1.innerHTML = '<a href="keki-ar.html"><button type="button" id="c_btn" class="btn btn-primary btn-circle btn-xl"><i class="material-icons">camera</i></button></a>';
        } else if (check_fbt == true) {
            x.innerHTML = '<div id="check_header" style="background-color: green;">คุณกำลังอยู่ในพื้นที่ให้บริการ</div>';
            y.innerHTML = '<div id="zone_header">โซนอพาร์ทเมนต์ FBT</div>';
            btn1.innerHTML = '<a href="fbt-ar.html"><button type="button" id="c_btn" class="btn btn-primary btn-circle btn-xl"><i class="material-icons">camera</i></button></a>';
        } else {
            y.innerHTML = '<div id="check_header" style="background-color: red;">คุณไม่อยู่ในพื้นที่ให้บริการในขณะนี้</div>';
        }

        var locations = [
            ['Sumfruit บิงซู ลาดกระบัง', 13.7275256, 100.7708011, 'zone01', 'keki01'], //keki (11)
            ['Daily delivery KMITL', 13.7278467, 100.7701097, 'zone01', 'keki02'],
            ['มานีมีนมลาดกระบัง', 13.7277224, 100.7704063, 'zone01', 'keki03'],
            ['STEAK TECHNO สเต็ก เทคโนฯ', 13.727815, 100.769738, 'zone01', 'keki04'],
            ['Shogun ลาดกระบัง', 13.7277267, 100.7702708, 'zone01', 'keki05'],
            ['ฅน 8 หน้า SUSHI BAR & RESTAURANT', 13.7275384, 100.7696328, 'zone01', 'keki06'],
            ['ชาชักโกอิน', 13.7273668, 100.769545, 'zone01', 'keki07'],
            ['ญาแฝดข้าวมันไก่ ซ.เกกี4', 13.7273834, 100.7694829, 'zone01', 'keki08'],
            ['Hand Burger', 13.7277198, 100.770279, 'zone01', 'keki09'],
            ['วัวล้วนๆ ไม่มีควายผสม สาขา ลาดกะบัง KMITL', 13.7277895, 100.7701018, 'zone01', 'keki10'],
            ['เสต็ก อิ่มเอม', 13.7271134, 100.7703543, 'zone01', 'keki11'],
            ['BKK Grill', 13.7213184, 100.7836547, 'zone02', 'jinda01'], //jinda (10)
            ['Coffee Today คอฟฟี่ทูเดย์', 13.7218673, 100.7843005, 'zone02', 'jinda02'],
            ['ICE FEELING', 13.7215943, 100.7836567, 'zone02', 'jinda03'],
            ['ครัวฅนเมือง', 13.7214214, 100.7836731, 'zone02', 'jinda04'],
            ['เดอะ พิซซ่า คอมปะนี', 13.7218051, 100.7835085, 'zone02', 'jinda05'],
            ['Pasta Home (พาสต้าโฮม)', 13.71779, 100.783517, 'zone02', 'jinda06'],
            ['สุกี้ดารา', 13.7221057, 100.7852154, 'zone02', 'jinda07'],
            ['R-HA (อาฮ่า)', 13.721437, 100.783842, 'zone02', 'jinda08'],
            ['เกี๊ยวกุ้งจินดา', 13.7212019, 100.7842203, 'zone02', 'jinda09'],
            ['ไอศครีมไข่แข็ง', 13.720562, 100.783833, 'zone02', 'jinda10'],
            ['ชาบู ปาร์ตี้ (Shabu party)', 13.7221422, 100.7807354, 'zone03', 'fbt01'], //fbt (10)
            ['จินตภัทร์ เบเกอรี่', 13.722068, 100.780391, 'zone03', 'fbt02'],
            ['ชา กุมารทอง', 13.723102, 100.7804381, 'zone03', 'fbt03'],
            ['บ้านข้าวซอย', 13.7228489, 100.7807009, 'zone03', 'fbt04'],
            ['พั้น~ซ์', 13.7216955, 100.780325, 'zone03', 'fbt05'],
            ['ร้านโคม', 13.7237173, 100.7807419, 'zone03', 'fbt06'],
            ['ละมุน (Lamoon)', 13.7225579, 100.7803574, 'zone03', 'fbt07'],
            ['สุขใจเตี๋ยวไข่ต้มยำ ', 13.7228773, 100.7803227, 'zone03', 'fbt08'],
            ['แมวกินปลา@ลาดกระบัง', 13.7228186, 100.7801383, 'zone03', 'fbt09'],
            ['ไก่เกาหลี อูรี ชิกเก้นท์ 우리 치킨 สาขา ลาดกระบัง', 13.7220672, 100.7804952, 'zone03', 'fbt10']
        ]; //total = 31 places

        var mapOptions = {
            center: u_latlng,
            zoom: 19,
            mapTypeId: 'terrain',
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: true,
            fullscreenControl: false,
            streetViewControl: false,
        }

        var maps = new google.maps.Map(document.getElementById("map"), mapOptions);
        var marker, i, info;

        // add markers to location and show window of restaurant
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: maps,
                title: locations[i][0]
            });

            info = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    var dbMarker = ref.child("restaurant/" + locations[i][3] + "/" + locations[i][4] + "/")
                    dbMarker.on("value", function(snapshot) {
                        typeRes = snapshot.child("res_type").val();
                        iconMarker = '<div id="iconMarker"><img id="icon_marker" src="pic/' + typeRes + '_icon.png"></div></div>'
                        var numReviews = snapshot.child("res_review").numChildren();

                        var sumRating = 0;
                        for (let x = 1; x <= numReviews; x++) {
                            var eachRate = snapshot.child("res_review/res_review" + x + "/rating").val();
                            sumRating += (eachRate / 5);
                        }
                        sumRating_marker = sumRating.toFixed(1);

                        var floorStar = Math.floor(sumRating);
                        if (floorStar == 1) {
                            getPoint = '<img class="u_star" src="pic/onepoint.png">';
                        } else if (floorStar == 2) {
                            getPoint = '<img class="u_star" src="pic/twopoint.png">';
                        } else if (floorStar == 3) {
                            getPoint = '<img class="u_star" src="pic/threepoint.png">';
                        } else if (floorStar == 4) {
                            getPoint = '<img class="u_star" src="pic/fourpoint.png">';
                        } else if (floorStar == 5) {
                            getPoint = '<img class="u_star" src="pic/fullpoint.png">';
                        } else {
                            getPoint = '<img class="u_star" src="pic/nopoint.png">';
                        }

                        var dateToday = new Date();
                        var dayName = ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"];
                        var days = snapshot.child("res_opening/" + dayName[dateToday.getDay()]).val();
                        if (days == "ปิดทำการ") {
                            marker_status.innerHTML = "ปิดอยู่ในขณะนี้";
                            colorStatus = "#ff0000";
                        } else {
                            splitTime = days.split("–");
                            timeOpen = splitTime[0].split(":");
                            timeClose = splitTime[1].split(":");
                            nowHours = dateToday.getHours();
                            nowMinutes = dateToday.getMinutes();
                            // parseInt

                            if (nowHours >= parseInt(timeOpen[0]) && nowHours <= parseInt(timeClose[0])) {
                                if (nowHours == parseInt(timeClose[0])) {
                                    if (nowMinutes <= parseInt(timeClose[1])) {
                                        marker_status = "เปิดอยู่ในขณะนี้";
                                        colorStatus = "#008000";
                                    } else {
                                        marker_status = "ปิดอยู่ในขณะนี้";
                                        colorStatus = "#ff0000";
                                    }
                                } else {
                                    marker_status = "เปิดอยู่ในขณะนี้";
                                    colorStatus = "#008000";
                                }
                            } else {
                                if (parseInt(timeClose[0]) < parseInt(timeOpen[0])) {
                                    if (nowHours <= parseInt(timeClose[0]) || nowHours >= parseInt(timeOpen[0])) {
                                        if (nowHours == parseInt(timeClose[0])) {
                                            if (nowMinutes <= parseInt(timeClose[1])) {
                                                marker_status = "เปิดอยู่ในขณะนี้";
                                                colorStatus = "#008000";
                                            } else {
                                                marker_status = "ปิดอยู่ในขณะนี้";
                                                colorStatus = "#ff0000";
                                            }
                                        } else {
                                            marker_status = "เปิดอยู่ในขณะนี้";
                                            colorStatus = "#008000";
                                            // in case that timeClose >= midnight & noeHour < timeClose
                                        }
                                    } else {
                                        marker_status = "ปิดอยู่ในขณะนี้";
                                        colorStatus = "#ff0000";
                                        // in other case that nowHour != opening hour
                                    }
                                } else {
                                    marker_status = "ปิดอยู่ในขณะนี้";
                                    colorStatus = "#ff0000";
                                    // else in normal case 
                                }
                            }
                        }
                    });

                    grid1 = '<div class="row"><div class="col-3">'
                    grid2 = '<div class="col-9"><div id="grid_marker" class="row"><div class="col-sm-6">'
                    nameMarker = '<h4 class="modal-title" id="name_marker">' + locations[i][0] + '</h4></div>'
                    grid3 = '<div class="col-sm-6" id="header_marker">'
                    starMarker = '<div id="mk_rating">' + getPoint + '</div>'
                    rateMarker = '<h6 id="total_marker"></h6>' + sumRating_marker + '</div>'
                    statusMarker = '</div><h6 id="status_marker" style="color:' + colorStatus + '";>&#8226;' + marker_status + '</h6></div>'

                    info.setContent(grid1 + iconMarker + grid2 + nameMarker + grid3 + starMarker + rateMarker + statusMarker);
                    info.open(maps, marker);
                }
            })(marker, i));
        } //loop 

        // show user's marker position
        var u_marker = new google.maps.Marker({
            position: new google.maps.LatLng(13.727822, 100.769886), //**user's location
            map: maps,
            title: 'ตำแหน่งผู้ใช้',
            icon: 'pic/user_marker.png',
            animation: google.maps.Animation.BOUNCE,
        });
        // For test: Jinda = 13.720278, 100.783761
        // For test: Keki = 13.727822, 100.769886
        // For test: FBT = 13.722719, 100.780227
        // For test: Unavailable  = 13.731270, 100.781224 (IT KMITL)
        //var u_latitude = position.coords.latitude;
        //var u_longitude = position.coords.longitude;

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