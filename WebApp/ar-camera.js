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
/*/
/*/
/*/
window.onload = () => {
    let places = staticLoadPlaces();
    //renderPlaces(places);
    geoFindMe();
};
/*/





function staticLoadPlaces() {
    return [{
            name: 'My Location',
            location: {
                lat: 13.7179259,
                lng: 100.6534443,
            }
        },

        {
            name: 'My Location',
            location: {
                lat: 13.7179259,
                lng: 100.6534443,
            }
        },

        {
            name: 'My Location',
            location: {
                lat: 13.7179259,
                lng: 100.6534443,
            }
        },
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', './icon/pin.png');
        model.setAttribute('rotation', '0 180 0');
        model.setAttribute('scale', '0.5 0.5 0.5');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}
/*/

/*/
var locate = document.getElementById("location");
var pic = document.getElementById("picstatus");

function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
    const zone = document.querySelector('#zone');

    mapLink.innerHTML = '';
    mapLink.href = '';
    mapLink.textContent = '';

    function success(position) {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.textContent = '';
        zone.textContent = '';

        locate.innerHTML = "Latitude: " + latitude +
            "<br>Longitude: " + longitude;
        mapLink.href = `http://www.google.com/maps/place/${latitude},${longitude}`;
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
        if (latitude == 13.7179259 && longitude == 100.6534443) {
            status.textContent = "My Home";
            pic.innerHTML = "<img src='icon/home.png'>";
        } else if (latitude == 13.7337142 && longitude == 100.6887425) {
            status.textContent = "โรงเรียนสุเหร่าทับช้าง";
            pic.innerHTML = "<img src='icon/school.png'>";
        } else if (latitude == 13.7329601 && longitude == 100.6857741) {
            status.textContent = "สถานีรถไฟบ้านทับช้าง";
            pic.innerHTML = "<img src='icon/train.png'>";
        } else {
            status.textContent = "ไม่อยู่ในพื่นที่บ้านทับช้าง";
            pic.innerHTML = "<img src='icon/pin.png'>";
        }


        zone.textContent = '';
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

        var latlng = new google.maps.LatLng(latitude, longitude); //user's location
        // For test: Jinda = 13.720278, 100.783761
        // For test: Keki = 13.727822, 100.769886
        // For test: FBT = 13.722719, 100.780227
        // For test: Unavailable  = 13.731270, 100.781224 (IT KMITL)

        var check_jinda = zone_jinda.contains(latlng);
        var check_keki = zone_keki.contains(latlng);
        var check_fbt = zone_fbt.contains(latlng);

        if (check_jinda == true) {
            zone.textContent = "โซนจินดานิเวศน์";
        } else if (check_keki == true) {
            zone.textContent = "โซนเกกีงาม";
        } else if (check_fbt == true) {
            zone.textContent = "โซนเอฟบีที";
        } else {
            zone.textContent = "คุณไม่อยู่ในเขตพื้นที่ให้บริการ";
        }

        let scene = document.querySelector('a-scene');

        places.forEach((place) => {

            let model = document.createElement('a-entity');
            model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            model.setAttribute('gltf-model', './icon/pin.png');
            model.setAttribute('rotation', '0 180 0');
            model.setAttribute('scale', '0.5 0.5 0.5');

            model.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
            });

            scene.appendChild(model);
        });

    }

    function error() {
        //ไม่สามารถเรียกคืนตำแหน่งของคุณ
        status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
        //เบราว์เซอร์ของคุณไม่รองรับการระบุตำแหน่งทางภูมิศาสตร์
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function showPosition(position) {
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
    ];

    var i, position, title;
    // add markers to location and show window of restaurant
    for (i = 0; i < locations.length; i++) {
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        title: locations[i][0]
    };
    // add markers to location and show window of restaurant
}
document.querySelector('#find-me').addEventListener('click', geoFindMe);

var models = [{
    url: './icon/pin.png',
    scale: '0.5 0.5 0.5',
    info: 'Pin-icon - Level 1',
    //rotation: '0 0 0',
}];

var modelIndex = 0;

var setModel = function(model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }
    /*/
    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }
    /*/
    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
    div.innerHTML = "<img src='icon/home.png'>";

};
scene.appendChild(model);

/*/ 
function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function() {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });
    
        /*/