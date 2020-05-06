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



//Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
ref = firebase.database().ref();

var type = document.getElementById("category");
var cate = ""
var dbMarker = ref.child("restaurant/zone01/keki01/")
dbMarker.on("value", function(snapshot) {
    typeRes = snapshot.child("res_type").val();
    if (typeRes == "") {
        cate = "ไม่พบข้อมูล";
    } else {
        cate = typeRes;
    }
});

// เช็ค
window.onload = function initMap() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(checkZone);
            console.log("Geolocation is supported by this browser.");
        } else {
            console.log("Geolocation is not supported by this browser.");
        }

        /*/
        var theSphere = document.querySelector("#mysphere");
        theSphere.addEventListener("Click", myReportingFunction);

        function myReportingFunction() {
            console.log("sphere was click on")
        }
/*/

        function checkZone(position) {
            console.log('เข้าใช้ function checkzone แล้ว');

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

            var kekiZone = [
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
                ['เสต็ก อิ่มเอม', 13.7271134, 100.7703543, 'zone01', 'keki11']
            ];

            var jindaZone = [
                ['BKK Grill', 13.7213184, 100.7836547, 'zone02', 'jinda01'], //jinda (10)
                ['Coffee Today คอฟฟี่ทูเดย์', 13.7218673, 100.7843005, 'zone02', 'jinda02'],
                ['ICE FEELING', 13.7215943, 100.7836567, 'zone02', 'jinda03'],
                ['ครัวฅนเมือง', 13.7214214, 100.7836731, 'zone02', 'jinda04'],
                ['เดอะ พิซซ่า คอมปะนี', 13.7218051, 100.7835085, 'zone02', 'jinda05'],
                ['Pasta Home (พาสต้าโฮม)', 13.71779, 100.783517, 'zone02', 'jinda06'],
                ['สุกี้ดารา', 13.7221057, 100.7852154, 'zone02', 'jinda07'],
                ['R-HA (อาฮ่า)', 13.721437, 100.783842, 'zone02', 'jinda08'],
                ['เกี๊ยวกุ้งจินดา', 13.7212019, 100.7842203, 'zone02', 'jinda09'],
                ['ไอศครีมไข่แข็ง', 13.720562, 100.783833, 'zone02', 'jinda10']
            ];

            var fbtZone = [
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

            var zl = document.getElementsByClassName('zonelabel');
            var zp = document.getElementsByClassName('zonepin');
            var ar = document.getElementsByClassName('showobject');

            if (check_jinda == true) {
                console.log('ตอนนี้คุณอยู่ในโซนจินดา');
                for (let i = 0; i < jindaZone.length; i++) {
                    if (jindaZone[i][3] == 'zone02') {
                        //console.log('zone 2 จินดา');
                        //console(jindaZone[i][4])
                        //console.log(jindaZone[i][0])
                        zl.innerHTML = '<div id="' + jindaZone[i][4] + 'div" class="label">' + jindaZone[i][0] + '</div>';
                        zp.innerHTML = '<div id="' + jindaZone[i][4] + 'pin"><i class="fa fa-map-marker" aria-hidden="true"></i></div>';
                        //console.log(zl.innerHTML);
                        //console.log(zp.innerHTML);
                        ar.innerHTML = '<ar-geopose id="' + jindaZone[i][4] + '" lla="' + jindaZone[i][2] + ' ' + jindaZone[i][1] + '" userotation="false">' +
                            '<a-entity fixedsize="20" billboard>' +
                            '<a-entity css-object="div: #' + jindaZone[i][4] + 'pin" scale="0.05 0.05 0.05" position="0 0 0"></a-entity>' +
                            '<a-entity css-object="div: #' + jindaZone[i][4] + 'div" scale="0.02 0.02 0.02" position="0 3 0" showdistance="' + jindaZone[i][0] + 'It is "></a-entity>' +
                            '</a-entity></ar-geopose>';
                        //console.log(zl);
                    }
                }
            } else if (check_keki == true) {
                console.log('ตอนนี้คุณอยู่ในโซนเกกี');
                for (let i = 0; i < kekiZone.length; i++) {
                    if (kekiZone[i][3] == 'zone01') {
                        //console.log('zone 1 เกกี');
                        console.log(kekiZone[i][0])
                        zl.innerHTML = '<div id="' + kekiZone[i][4] + 'div" class="label">' + kekiZone[i][0] + '</div>';
                        zp.innerHTML = '<div id="' + kekiZone[i][4] + 'pin"><i class="fa fa-map-marker" aria-hidden="true"></i></div>';
                        console.log(zl.innerHTML);
                        console.log(zp.innerHTML);
                        ar.innerHTML = '<ar-geopose id="' + kekiZone[i][4] + '" lla="' + kekiZone[i][2] + ' ' + kekiZone[i][1] + '" userotation="false">' +
                            '<a-entity fixedsize="20" billboard>' +
                            '<a-entity css-object="div: #' + kekiZone[i][4] + 'pin" scale="0.05 0.05 0.05" position="0 0 0"></a-entity>' +
                            '<a-entity css-object="div: #' + kekiZone[i][4] + 'div" scale="0.02 0.02 0.02" position="0 3 0" showdistance="' + kekiZone[i][0] + 'It is "></a-entity>' +
                            '</a-entity></ar-geopose>';
                        console.log(ar.innerHTML);
                    }
                }
            } else if (check_fbt == true) {
                console.log('ตอนนี้คุณอยู่ในโซนเอฟบีที');
                for (let i = 0; i < fbtZone.length; i++) {
                    if (fbtZone[i][3] == 'zone03') {
                        //console.log('zone 3 เอฟบีที');
                        console.log(fbtZone[i][0])
                        zl.innerHTML = '<div id="' + fbtZone[i][4] + 'div" class="label">' + fbtZone[i][0] + '</div>';
                        zp.innerHTML = '<div id="' + fbtZone[i][4] + 'pin"><i class="fa fa-map-marker" aria-hidden="true"></i></div>';
                        console.log(zl.innerHTML);
                        console.log(zp.innerHTML);
                        ar.innerHTML = '<ar-geopose id="' + fbtZone[i][4] + '" lla="' + fbtZone[i][2] + ' ' + fbtZone[i][1] + '" userotation="false">' +
                            '<a-entity fixedsize="20" billboard>' +
                            '<a-entity css-object="div: #' + fbtZone[i][4] + 'pin" scale="0.05 0.05 0.05" position="0 0 0"></a-entity>' +
                            '<a-entity css-object="div: #' + fbtZone[i][4] + 'div" scale="0.02 0.02 0.02" position="0 3 0" showdistance="' + fbtZone[i][0] + 'It is "></a-entity>' +
                            '</a-entity></ar-geopose>';
                        console.log(ar.innerHTML);
                    }
                }
            } else {
                console.log('คุณไม่อยู่ในพื้นที่ให้บริการ');
            }
        };
    } //initMap

AFRAME.registerComponent('showdistance', {
    schema: {
        default: ""
    },

    init: function() {
        this.text = "";
    },

    update: function() {
        this.text = this.data;

    },

    tick: function(t) {
        var object3D = this.el.object3D;
        var camera = this.el.sceneEl.camera;
        if (!camera) {
            return;
        }

        var cameraPos = camera.getWorldPosition();
        var thisPos = object3D.getWorldPosition();
        var distance = Math.round(thisPos.distanceTo(cameraPos));

        var cssDiv = this.el.getObject3D('div');
        var msg = this.text;
        cssDiv.elements[0].innerHTML = msg;
        cssDiv.elements[1].innerHTML = msg;

    }

});

/*/ ทดสอบแบบแมนนวล -0-
                    zl.innerHTML =
                        '<div id="keki01div" class="label"></div>' +
                        '<div id="keki02div" class="label"></div>' +
                        '<div id="keki03div" class="label"></div>' +
                        '<div id="keki04div" class="label"></div>' +
                        '<div id="keki05div" class="label"></div>' +
                        '<div id="keki06div" class="label"></div>' +
                        '<div id="keki07div" class="label"></div>' +
                        '<div id="keki08div" class="label"></div>' +
                        '<div id="keki09div" class="label"></div>' +
                        '<div id="keki010div" class="label"></div>' +
                        '<div id="keki11div" class="label"></div>';
                    zp.innerHTML =
                        '<div id="keki01pin" class="pin"><i class="fa fa-map-marker" aria-hidden="true"></i></div>' +
                        '<div id="keki02pin" class="pin"><i class="fa fa-map-marker" aria-hidden="true"></i></div>' +
                        '<div id="keki03pin" class="pin"><i class="fa fa-map-marker" aria-hidden="true"></i></div>' +
                        '<div id="keki04pin" class="pin"><i class="fa fa-map-marker" aria-hidden="true"></i></div>' +
                        '<div id="keki05pin" class="pin"><i class="fa fa-map-marker" aria-hidden="true"></i></div>' +
                        '<div id="keki06pin" class="pin"><i class="fa fa-map-marker" aria-hidden="true"></i></div>' +
                        '<div id="keki07pin" class="pin"><i class="fa fa-map-marker" aria-hidden="true"></i></div>' +
                        '<div id="keki08pin" class="pin"><i class="fa fa-map-marker" aria-hidden="true"></i></div>' +
                        '<div id="keki09pin" class="pin"><i class="fa fa-map-marker" aria-hidden="true"></i></div>' +
                        '<div id="keki10pin" class="pin"><i class="fa fa-map-marker" aria-hidden="true"></i></div>' +
                        '<div id="keki11pin" class="pin"><i class="fa fa-map-marker" aria-hidden="true"></i></div>';
                    ar.innerHTML =
                        '<ar-geopose id="keki01" lla="100.7708011 13.7275256" userotation="false"><a-entity fixedsize="20" billboard><a-entity css-object="div: #keki01pin" scale="0.05 0.05 0.05" position="0 0 0"></a-entity><a-entity css-object="div: #keki01div" scale="0.02 0.02 0.02" position="0 3 0" showdistance="Sumfruit บิงซู ลาดกระบังIt is "></a-entity></a-entity></ar-geopose>' +
                        '<ar-geopose id="keki02" lla="100.7701097 13.7278467" userotation="false"><a-entity fixedsize="20" billboard><a-entity css-object="div: #keki02pin" scale="0.05 0.05 0.05" position="0 0 0"></a-entity><a-entity css-object="div: #keki02div" scale="0.02 0.02 0.02" position="0 3 0" showdistance="Daily delivery KMITLIt is "></a-entity></a-entity></ar-geopose>' +
                        '<ar-geopose id="keki03" lla="100.7704063 13.7277224" userotation="false"><a-entity fixedsize="20" billboard><a-entity css-object="div: #keki03pin" scale="0.05 0.05 0.05" position="0 0 0"></a-entity><a-entity css-object="div: #keki03div" scale="0.02 0.02 0.02" position="0 3 0" showdistance="มานีมีนมลาดกระบังIt is "></a-entity></a-entity></ar-geopose>' +
                        '<ar-geopose id="keki04" lla="100.769738 13.727815" userotation="false"><a-entity fixedsize="20" billboard><a-entity css-object="div: #keki04pin" scale="0.05 0.05 0.05" position="0 0 0"></a-entity><a-entity css-object="div: #keki04div" scale="0.02 0.02 0.02" position="0 3 0" showdistance="STEAK TECHNO สเต็ก เทคโนฯIt is "></a-entity></a-entity></ar-geopose>' +
                        '<ar-geopose id="keki05" lla="100.7702708 13.7277267" userotation="false"><a-entity fixedsize="20" billboard><a-entity css-object="div: #keki05pin" scale="0.05 0.05 0.05" position="0 0 0"></a-entity><a-entity css-object="div: #keki05div" scale="0.02 0.02 0.02" position="0 3 0" showdistance="Shogun ลาดกระบังIt is "></a-entity></a-entity></ar-geopose>' +
                        '<ar-geopose id="keki06" lla="100.7696328 13.7275384" userotation="false"><a-entity fixedsize="20" billboard><a-entity css-object="div: #keki06pin" scale="0.05 0.05 0.05" position="0 0 0"></a-entity><a-entity css-object="div: #keki06div" scale="0.02 0.02 0.02" position="0 3 0" showdistance="ฅน 8 หน้า SUSHI BAR & RESTAURANTIt is "></a-entity></a-entity></ar-geopose>' +
                        '<ar-geopose id="keki07" lla="100.769545 13.7273668" userotation="false"><a-entity fixedsize="20" billboard><a-entity css-object="div: #keki07pin" scale="0.05 0.05 0.05" position="0 0 0"></a-entity><a-entity css-object="div: #keki07div" scale="0.02 0.02 0.02" position="0 3 0" showdistance="ชาชักโกอินIt is "></a-entity></a-entity></ar-geopose>' +
                        '<ar-geopose id="keki08" lla="100.7694829 13.7273834" userotation="false"><a-entity fixedsize="20" billboard><a-entity css-object="div: #keki08pin" scale="0.05 0.05 0.05" position="0 0 0"></a-entity><a-entity css-object="div: #keki08div" scale="0.02 0.02 0.02" position="0 3 0" showdistance="ญาแฝดข้าวมันไก่ ซ.เกกี4It is "></a-entity></a-entity></ar-geopose>' +
                        '<ar-geopose id="keki09" lla="100.770279 13.7277198" userotation="false"><a-entity fixedsize="20" billboard><a-entity css-object="div: #keki09pin" scale="0.05 0.05 0.05" position="0 0 0"></a-entity><a-entity css-object="div: #keki09div" scale="0.02 0.02 0.02" position="0 3 0" showdistance="Hand BurgerIt is "></a-entity></a-entity></ar-geopose>' +
                        '<ar-geopose id="keki10" lla="100.7701018 13.7277895" userotation="false"><a-entity fixedsize="20" billboard><a-entity css-object="div: #keki10pin" scale="0.05 0.05 0.05" position="0 0 0"></a-entity><a-entity css-object="div: #keki10div" scale="0.02 0.02 0.02" position="0 3 0" showdistance="วัวล้วนๆ ไม่มีควายผสม สาขา ลาดกะบัง KMITLIt is "></a-entity></a-entity></ar-geopose>' +
                        '<ar-geopose id="keki11" lla="100.7703543 13.7271134" userotation="false"><a-entity fixedsize="20" billboard><a-entity css-object="div: #keki11pin" scale="0.05 0.05 0.05" position="0 0 0"></a-entity><a-entity css-object="div: #keki11div" scale="0.02 0.02 0.02" position="0 3 0" showdistance="เสต็ก อิ่มเอมIt is "></a-entity></a-entity></ar-geopose>';
                /*/