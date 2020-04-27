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

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(checkZone);
    console.log("Geolocation is supported by this browser.");
} else {
    console.log("Geolocation is not supported by this browser.");
}

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

    var u_latlng = new google.maps.LatLng(13.722719, 100.780227); //**user's location
    // For test: Jinda = 13.720278, 100.783761
    // For test: Keki = 13.727822, 100.769886
    // For test: FBT = 13.722719, 100.780227
    // For test: Unavailable  = 13.731270, 100.781224 (IT KMITL)

    var check_jinda = zone_jinda.contains(u_latlng);
    var check_keki = zone_keki.contains(u_latlng);
    var check_fbt = zone_fbt.contains(u_latlng);

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



    if (check_jinda == true) {
        console.log('ตอนนี้คุณอยู่ในโซนจินดา');
        for (let i = 0; i < locations.length; i++) {
            if (locations[i][3] == 'zone02') {
                //console.log('zone 2 จินดา');
                //console(locations[i][4])
                console.log(locations[i][0])
            }
        }
    } else if (check_keki == true) {
        console.log('ตอนนี้คุณอยู่ในโซนเกกี');
        for (let i = 0; i < locations.length; i++) {
            if (locations[i][3] == 'zone01') {
                //console.log('zone 1 เกกี');
                console.log(locations[i][0])
            }
        }
    } else if (check_fbt == true) {
        console.log('ตอนนี้คุณอยู่ในโซนเอฟบีที');
        for (let i = 0; i < locations.length; i++) {
            if (locations[i][3] == 'zone03') {
                //console.log('zone 3 เอฟบีที');
                console.log(locations[i][0])
            }
        }
    } else {
        console.log('คุณไม่อยู่ในพื้นที่ให้บริการ');
    }
};




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
        var msg = this.text + cate;
        cssDiv.elements[0].innerHTML = msg;
        cssDiv.elements[1].innerHTML = msg;

    }

});