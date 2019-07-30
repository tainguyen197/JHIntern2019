
const closeMapBtn = document.getElementById('close-map');
if(closeMapBtn){
  closeMapBtn.addEventListener('click',() =>{
    const locationMap = document.getElementById('mapBox')
		locationMap.classList.remove('map-box-active');
  })
}

initMap = () => {
  const JHOffice = { lat: 10.7643763, lng: 106.68136 };
  const image = 'https://i.ibb.co/7zXpPsZ/marker2.png';
  const map = new google.maps.Map(document.getElementById("map"), {
    center: JHOffice,
    zoom: 17,
  });

  const marker = new google.maps.Marker({ position: JHOffice, map: map,icon:image });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const geolocate = {
          lat: latitude,
          lng: longitude
        };
        const infowindow = new google.maps.InfoWindow({
          map: map,
          position: geolocate,
          content: "You are here"
        });

        map.setCenter(geolocate);
      },
      () => {
        window.alert("Oh no :(");
      }
    );
  } else {
  }
}

