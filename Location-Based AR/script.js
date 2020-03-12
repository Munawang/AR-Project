window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = 'Click';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

//ANCHOR    ใส่ชื่อตำแหน่งที่ต้องการให้แสดงและพิกัดละติจุดลองจิจุด
function staticLoadPlaces() {
    return [{
            name: 'Tapchang School',
            location: {
                //โรงเรียนสุเหร่าทับช้าง ตึก
                lat: 13.7337159,
                lng: 100.6370816,
            },
        },
        {
            name: 'My Home',
            location: {
                //บ้านตัวเอง
                lat: 13.7354394,
                lng: 100.6639269,
            },
        },
        {
            name: 'Tapchang Station',
            location: {
                lat: 13.7331541,
                lng: 100.6889038,
            },
        },
    ];
}


// ANCHOR  AR ที่ต้องการให้แสดงบนหน้าจอ
/*  url : เรียกที่อยู่ของ AR
    scale: ขนาดของ AR
    info: ข้อมูลที่ต้องการให้แสดงบนหน้าจอ
*/
var models = [{
        url: 'icon/pin.png',
        scale: '0.5 0.5 0.5',
        info: 'PIN Level 1',
        rotation: '0 180 0',
    },
    {
        url: 'icon/world.png',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'World Level 2',
    },
    {
        url: 'icon/map.png',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Map Level 3',
    },
];

var modelIndex = 0;
var setModel = function(model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

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

        scene.appendChild(model);
    });
}