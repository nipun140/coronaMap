updateMap();

function updateMap() {


    fetch('https://api.covid19api.com/live/country/india')
        .then(Response => Response.json())
        .then(rsp => {
            rsp.forEach(element => {
                const latitude = element.Lat;
                const longitude = element.Lon;
                const active = element.Active;
                const Province = element.Province;

                if (active > 255) {
                    color = `rgba(255,0,0)`
                } else {
                    color = `rgba(${active},0,0)`
                }


                var popup = new mapboxgl.Popup({ offset: 25, className: 'red' }).setHTML(
                    `<p>${Province}</p>active Cases:${active}<p> `
                );


                // Set marker
                var marker = new mapboxgl.Marker({
                        color: color,
                        draggable: false
                    }).setLngLat([longitude, latitude])
                    .setPopup(popup) // sets a popup on this marker
                    .addTo(map);

            });
        })

}

setInterval(updateMap, 20000);