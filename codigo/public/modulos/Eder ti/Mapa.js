
let map; 
let markers = []; 


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -19.92229860562907, lng: -43.9249847432524 },
        zoom: 17,
    });

    
    fetch("http://localhost:3000/locais") 
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar locais do servidor");
            }
            return response.json();
        })
        .then(locais => {
            locais.forEach(local => {
                const marker = new google.maps.Marker({
                    position: { lat: local.lat, lng: local.lng },
                    map: map,
                    title: local.nome,
                    label: 'H',
                });
                markers.push(marker); 
            });
        })
        .catch(error => console.error("Erro ao carregar locais:", error));
}


document.querySelector("button").addEventListener("click", () => {
    const cep = document.getElementById("cep").value.trim();

    if (!cep) {
        alert("Por favor, insira um CEP válido.");
        return;
    }

    
    localStorage.setItem("lastSearchedCEP", cep);


    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado. Tente novamente.");
                return;
            }

            const { logradouro, localidade, uf } = data;
            console.log(`Endereço: ${logradouro}, ${localidade} - ${uf}`);

         
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: `${logradouro}, ${localidade} - ${uf}` }, (results, status) => {
                if (status === "OK") {
                    
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(15);

                 
                    const tempMarker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map,
                        title: "Local pesquisado",
                        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", 
                    });

                 
                    setTimeout(() => tempMarker.setMap(null), 10000);
                } else {
                    alert("Erro ao encontrar a localização no mapa.");
                }
            });
        })
        .catch(err => alert("Erro ao buscar o CEP. Tente novamente mais tarde."));
});


window.addEventListener("load", () => {
    const lastCEP = localStorage.getItem("lastSearchedCEP");
    if (lastCEP) {
        document.getElementById("cep").value = lastCEP;
    }
});
