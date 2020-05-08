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

//Get restaurant's name from AR
var nameAR = localStorage.name;
restId = nameAR.replace("img", "");
zonename = restId.slice(0, -2);
if (zonename == "keki") {
    var zoneId = "zone01"
}if(zonename == "jinda"){
    var zoneId = "zone02"
}if(zonename == "fbt"){
    var zoneId = "zone03"
}

// //Get information from Firebase
var getName = document.getElementById("name_restaurant");
var category_icon = document.getElementById("iconCat");
var type = document.getElementById("category");
var phone = document.getElementById("cont_phone");
var phoneCall = document.getElementById("phone");
var mon = document.getElementById("opening_mon");
var tue = document.getElementById("opening_tue");
var wed = document.getElementById("opening_wed");
var thu = document.getElementById("opening_thu");
var fri = document.getElementById("opening_fri");
var sat = document.getElementById("opening_sat");
var sun = document.getElementById("opening_sun");
var detail_status = document.getElementById("status");
var modal_sumRate = document.getElementById("total_rating");
var modal_sumStar = document.getElementById("t_rating");
var reviews = document.getElementById("reviewBox");
var images = document.getElementById("ImageBox");
var website_btn = document.getElementById("more_web");


var dbshowInfo = ref.child("restaurant/" + zoneId + "/" + restId + "/")
dbshowInfo.on("value", function(snapshot) {
    getName.innerHTML = snapshot.child("res_name").val();
    typeRes = snapshot.child("res_type").val();
    if (typeRes == "") {
        type.innerHTML = "ไม่พบข้อมูล";
    } else {
        type.innerHTML = typeRes;
        category_icon.innerHTML = '<img id="icon_cat" src="pic/' + typeRes + '_icon.png" style="width:100px;height:100px;">';
    }

    var phoneNumber = snapshot.child("res_phonenumber").val();
    if (phoneNumber == "") {
        phone.innerHTML = "ไม่พบข้อมูล";
        phoneCall.innerHTML = '<button id="notel_btn" type="button" class="btn btn-secondary btn-lg btn-block" disabled>โทร</button>';
    } else {
        phone.innerHTML = phoneNumber;
        phoneCall.innerHTML = '<a href="tel:' + phoneNumber.replace(/\s+/g, '') + '">' +
            '<button id="tel_btn" type="button" class="btn btn-lg btn-block">โทร</button></a>';
    }

    var dateToday = new Date();
    var dayName = ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"];
    var days = snapshot.child("res_opening/" + dayName[dateToday.getDay()]).val();
    if (days == "ปิดทำการ") {
        detail_status.innerHTML = "ปิดอยู่ในขณะนี้";
        detail_status.style.color = "#ff0000";
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
                    detail_status.innerHTML = "เปิดอยู่ในขณะนี้";
                    detail_status.style.color = "#008000";
                } else {
                    detail_status.innerHTML = "ปิดอยู่ในขณะนี้";
                    detail_status.style.color = "#ff0000";
                }
            } else {
                detail_status.innerHTML = "เปิดอยู่ในขณะนี้";
                detail_status.style.color = "#008000";
            }
        } else {
            if (parseInt(timeClose[0]) < parseInt(timeOpen[0])) {
                if (nowHours <= parseInt(timeClose[0]) || nowHours >= parseInt(timeOpen[0])) {
                    if (nowHours == parseInt(timeClose[0])) {
                        if (nowMinutes <= parseInt(timeClose[1])) {
                            detail_status.innerHTML = "เปิดอยู่ในขณะนี้";
                            detail_status.style.color = "#008000";
                        } else {
                            detail_status.innerHTML = "ปิดอยู่ในขณะนี้";
                            detail_status.style.color = "#ff0000";
                        }
                    } else {
                        detail_status.innerHTML = "เปิดอยู่ในขณะนี้";
                        detail_status.style.color = "#008000";
                        // in case that timeClose >= midnight & noeHour < timeClose
                    }
                } else {
                    detail_status.innerHTML = "ปิดอยู่ในขณะนี้";
                    detail_status.style.color = "#ff0000";
                    // in other case that nowHour != opening hour
                }
            } else {
                detail_status.innerHTML = "ปิดอยู่ในขณะนี้";
                detail_status.style.color = "#ff0000";
                // else in normal case 
            }
        }
    }

    var d_mon = snapshot.child("res_opening/วันจันทร์").val();
    var d_tue = snapshot.child("res_opening/วันอังคาร").val();
    var d_wed = snapshot.child("res_opening/วันพุธ").val();
    var d_thu = snapshot.child("res_opening/วันพฤหัสบดี").val();
    var d_fri = snapshot.child("res_opening/วันศุกร์").val();
    var d_sat = snapshot.child("res_opening/วันเสาร์").val();
    var d_sun = snapshot.child("res_opening/วันอาทิตย์").val();

    if (d_mon == "") {
        mon.innerHTML = "ไม่พบข้อมูล";
        tue.innerHTML = "";
        wed.innerHTML = "";
        thu.innerHTML = "";
        fri.innerHTML = "";
        sat.innerHTML = "";
        sun.innerHTML = "";
    } else {
        mon.innerHTML = '<li>วันจันทร์: ' + d_mon + '</li>';
        tue.innerHTML = '<li>วันอังคาร: ' + d_tue + '</li>';
        wed.innerHTML = '<li>วันพุธ: ' + d_wed + '</li>';
        thu.innerHTML = '<li>วันพฤหัสบดี: ' + d_thu + '</li>';
        fri.innerHTML = '<li>วันศุกร์: ' + d_fri + '</li>';
        sat.innerHTML = '<li>วันเสาร์: ' + d_sat + '</li>';
        sun.innerHTML = '<li>วันอาทิตย์: ' + d_sun + '</li>';
    }

    var numReviews = snapshot.child("res_review").numChildren();
reviews.innerHTML = "";
var sumRating = 0;

for (let x = 1; x <= numReviews; x++) {
    var eachReview = snapshot.child("res_review/res_review" + x + "/text").val();
    var eachRate = snapshot.child("res_review/res_review" + x + "/rating").val();
    reviews.innerHTML +=
        '<div class="card cont_box">' +
        '<div class="card-body">' +
        '<div class="col-sm-6 grid_rating">' +
        '<div class="u_rating"></div>' +
        '<p class="user_rating">' + eachRate + '</p>' +
        '</div>' +
        '<p class="cont_review">' + eachReview + '</p>' +
        '</div></div><br>';

    var userStars = document.getElementsByClassName("u_rating")[x - 1];
    var getPoint = '<img class="u_star" src="pic/get_star.png">';
    var noPoint = '<img class="u_star" src="pic/nopoint.png">';
    if (eachRate == 0 || eachRate == "") {
        userStars.innerHTML += noPoint.repeat(5);
    } else {
        userStars.innerHTML = "";
        userStars.innerHTML += getPoint.repeat(eachRate);
        userStars.innerHTML += noPoint.repeat(5 - eachRate);
    }
    sumRating += (eachRate / 5);
}

    modal_sumRate.innerHTML = sumRating.toFixed(1);
    var floorStar = Math.floor(sumRating);
    if (sumRating == 0 || sumRating == "") {
        modal_sumStar.innerHTML += noPoint.repeat(5);
    } else {
        modal_sumStar.innerHTML = "";
        modal_sumStar.innerHTML += getPoint.repeat(floorStar);
        modal_sumStar.innerHTML += noPoint.repeat(5 - floorStar);
    }

    var numImage = snapshot.child("res_img").numChildren();
    images.innerHTML = "";
    for (let y = 1; y < numImage + 1; y++) {
        if (y < 10) {
            var checkNum = "0";
        } else {
            var checkNum = "";
        }
        var urlImage = snapshot.child("res_img/img" + checkNum + y).val();
        images.innerHTML += '<div class="fade_textbox">' +
            '<img class="res_pic" src="' + urlImage + '">' +
            '<div class="cont_img">' +
            '<p>Picture by Google Map</p>'
        '</div></div>';
    }

    var numWebsite = snapshot.child("res_urlweb").numChildren();
    website_btn.innerHTML = "";
    for (let z = 1; z <= numWebsite; z++) {
        if (z < 10) {
            var checkWeb = "0";
        } else {
            var checkWeb = "";
        }
        var nameWeb = snapshot.child("res_urlweb/res_urlweb" + checkWeb + z + "/webname").val();
        var urlWeb = snapshot.child("res_urlweb/res_urlweb" + checkWeb + z + "/url").val();
        website_btn.innerHTML += '<a href="' + urlWeb + '">' +
            '<button type="button" class="btn other_web">' + nameWeb + '</button></a>&nbsp;';
    }
});