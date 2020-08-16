const selectCountry = document.getElementById("country");

async function countryAPI() {
  //get the text inside the option, not the value
  const countrySelected = selectCountry.options[selectCountry.selectedIndex].text;
  const res = await fetch(`https://restcountries.eu/rest/v2/name/${countrySelected}`);
  const data = await res.json();
  let latlng = data[0].latlng;
  let lang = [];
  data[0].languages.forEach((el) => lang.push(el.name));
  myMap(latlng);
  document.querySelector(".results").innerHTML = `<ul>
      <li><img src=${data[0].flag} alt="${data[0].name}"</li>
      <br><br>
      <li><b>Capital:</b> ${data[0].capital}</li>
      <li><b>Population:</b> ${formatNum(data[0].population)}</li>
      <li><b>Currency:</b> ${data[0].currencies[0].name} (${data[0].currencies[0].symbol})</li>
      <li><b>Language:</b> ${lang}</li>
      <li><b>Native Name:</b> ${data[0].nativeName}</li>
      <li><b>Borders:</b> ${data[0].borders}</li>
    </ul>`;
}

selectCountry.addEventListener("change", countryAPI);

countryAPI();

//format number
const formatNum = (number) =>
  number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

function myMap(latlng) {
  if(latlng){
    var mapProp = {
      center: new google.maps.LatLng(latlng[0],latlng[1]),
      zoom: 6,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  }
}