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
    alert("browser does support geolocation!");
} else {
    console.log("Geolocation is not supported by this browser.");
    alert("Sorry, browser does not support geolocation!");
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

    var u_latlng = new google.maps.LatLng(u_latitude, u_longitude); //**user's location
    // For test: Jinda = 13.720278, 100.783761
    // For test: Keki = 13.727822, 100.769886
    // For test: FBT = 13.722719, 100.780227
    // For test: Unavailable  = 13.731270, 100.781224 (IT KMITL)

    var check_jinda = zone_jinda.contains(u_latlng);
    var check_keki = zone_keki.contains(u_latlng);
    var check_fbt = zone_fbt.contains(u_latlng);

    if (check_jinda == true) {
        console.log('ตอนนี้คุณอยู่ในโซน jinda');
    } else if (check_keki == true) {
        console.log('ตอนนี้คุณอยู่ในโซน keki');
    } else if (check_fbt == true) {
        console.log('ตอนนี้คุณอยู่ในโซน fbt');
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