function initMap() {
    const mapOptions = {
        center: {lat: -19.92229860562907, lng: -43.9249847432524},
        zoom: 17
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
}
