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
