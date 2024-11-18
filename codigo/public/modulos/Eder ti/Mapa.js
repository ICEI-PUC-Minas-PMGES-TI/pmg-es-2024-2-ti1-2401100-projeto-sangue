function initMap() {
    const mapOptions = {
        center: { lat: -19.92229860562907, lng: -43.9249847432524 },
        zoom: 17,
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);


    const locais = [
        { lat: -19.92229860562907, lng: -43.9249847432524, nome: "Laboratório Central" },
        { lat: -19.92457622100608, lng: -43.93170197549214, nome: "Posto de Coleta 1" },
        { lat: -19.925100, lng: -43.920400, nome: "Posto de Coleta 2" },
    ];

    locais.forEach(local => {
        const marker = new google.maps.Marker({
            position: { lat: local.lat, lng: local.lng },
            map: map,
            title: local.nome || "Hemominas",
            label: 'H'
        });
    });
}


function success(pos){
    console.log(pos.coords.latitude, pos.coords.longitude);
    h2.textContent = `Latitude:${pos.coords.latitude}, Longitude:${pos.coords.longitude}`;
}

function error(err){
    console.log(err);
}

var watchID = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000})

    document.querySelector("button").addEventListener("click", function () {
        const cep = document.getElementById("cep").value.trim();
    
        if (!cep) {
            alert("Por favor, insira um CEP válido.");
            return;
        }
    
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert("CEP não encontrado. Tente novamente.");
                } else {
                    const { logradouro, bairro, localidade, uf } = data;
                    console.log(`Endereço: ${logradouro}, ${bairro}, ${localidade} - ${uf}`);
    
                 
                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ address: `${logradouro}, ${localidade} - ${uf}` }, function (results, status) {
                        if (status === "OK") {
                            const map = new google.maps.Map(document.getElementById("map"), {
                                center: results[0].geometry.location,
                                zoom: 15,
                            });
                            new google.maps.Marker({
                                position: results[0].geometry.location,
                                map: map,
                            });
                        } else {
                            alert("Erro ao encontrar a localização no mapa.");
                        }
                    });
                }
            })
            .catch(err => alert("Erro ao buscar o CEP. Tente novamente mais tarde."));
    });
    