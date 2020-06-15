let myMap = L.map('mapid').setView([51,16], 3);
let myMap2 = L.map('secondmap').setView([51,16], 3);
let apiKey;

let apiKHTTP = new XMLHttpRequest();
apiKHTTP.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        apiKey = this.responseText;
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: apiKey 
        }).addTo(myMap);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: apiKey 
        }).addTo(myMap2);

    }
};

apiKHTTP.open("GET", "api_key.txt", true);
apiKHTTP.send();



var drawBorders=function(){
	console.log(apiKey)
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            L.geoJSON(JSON.parse(this.responseText)).addTo(myMap2);
        }
    };

    xhttp.open("GET", "data/CNTR_BN_60M_2013_3857.geojson", true);
    xhttp.send();
    // More modern alternative:
    //   fetch('./CNTR_BN_60M_2013_3857.geojson').then(
    //      function(response){


    //        response.json().then(function(data) {
    //            L.geoJSON(data).addTo(myMap2)
    //        });
    //      }
    //   )
}
var mapClick=function(e) {

	let q=`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`;

    let nominatim = new XMLHttpRequest();
    nominatim.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let respT = JSON.parse(this.responseText) 
            L.marker(e.latlng).addTo(myMap)
                .bindPopup(respT.address.country)
                .openPopup();
        }
    };

    nominatim.open("GET", q, true);
    nominatim.send();
}

myMap.on('click', mapClick);



