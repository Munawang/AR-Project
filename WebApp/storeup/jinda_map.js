var locations = [
['สุกี้ดารา', 13.7221057, 100.7852154],
['Pasta Home (พาสต้าโฮม)', 13.71779, 100.783517],
['เกี๊ยวกุ้งจินดา', 13.7212019, 100.7842203],
['Coffee Today คอฟฟี่ทูเดย์',13.7218673, 100.7843005],
['BKK Grill',13.7213184, 100.7836547],
['ICE FEELING',13.7215943, 100.7836567],
['ครัวฅนเมือง', 13.7214214, 100.7836731],
['ครัวป้าเจ๊ก', 13.7197648, 100.7837982],
['R-HA (อาฮ่า)', 13.721437, 100.783842],
['ไอศครีมไข่แข็ง', 13.720562, 100.783833,]
];

function initMap() {
	var mapOptions = {
		center: {lat: 13.720087, lng: 100.784640},
		zoom: 16.2,
		mapTypeId: 'terrain',
		zoomControl: true,
		mapTypeControl: false,
		scaleControl: true,
		fullscreenControl: false,
		streetViewControl: false,
	}

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
				info.setContent('<div style="font-size: 18px;color: purple";text-align:center>'+locations[i][0]+'</div>'
					+'<button type="button" class="btn edit_reslist" data-toggle="modal" data-target="#exampleModalLong">อ่านต่อ</button>');
				info.open(maps, marker);
			}
		})(marker, i));

	}

}