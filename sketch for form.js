var canvas;
var data;
var nations;
var states;
var cities;
var dropdown1;
var dropdown2;
var dropdown3;
var allthecountrynames = [];
var statesnames = [];
var citiesnames = [];
var sceltacountry1;
var sceltacountry2;
var coordinates;
var arreydeprova = [];
var latCity;
var lngCity;


function preload() {
  // data = loadJSON("world-cities.json");
  nations = loadJSON("countries.json");
  states = loadJSON("states.json");
  cities = loadJSON("cities.json");
  coordinates = loadJSON("coordinates.json");
}

function setup() {
  canvas = createCanvas(100, 100);
  canvas.parent("#tela");

  //select all elements with class "name" inside the .json file



  dropdown1 = createSelect();
  dropdown1.position(10, 10);
  dropdown2 = createSelect();
  dropdown2.position(10, 40);
  dropdown3 = createSelect();
  dropdown3.position(10, 70);

  // Riempiamo allthecountrynames
  for (var i = 0; i < nations.countries.length; i++) {
    allthecountrynames.push(nations.countries[i].name);
  }
  // Riempiamo dropdown1 con l'array allthecountrynames
  for (var i = 0; i < allthecountrynames.length; i++) {
    dropdown1.option(allthecountrynames[i]);

  }
  dropdown1.changed(fillDrop2);
}


function draw() {

}

function fillDrop2() {

// azzero le options del drop
  dropdown2.id("options2");
  document.getElementById("options2").innerHTML =
    null;


  // se il terzo drop ha delle options le cancello
    dropdown3.id("options3");
  if (dropdown3.option.length > 0) {
    document.getElementById("options3").innerHTML =
      null;
  }


  var sceltacountry1 = dropdown1.value();
  var idScelta1 = readId(sceltacountry1)

  // Riempiamo statesnames
  for (var i = 0; i < states.states.length; i++) {
    if (states.states[i].country_id == idScelta1) {
      statesnames.push(states.states[i].name);
    }
  }

  // Riempiamo dropdown2 con l'array statesnames
  for (var i = 0; i < statesnames.length; i++) {
    dropdown2.option(statesnames[i]);
  }

  statesnames = [];

  dropdown2.changed(fillDrop3);
}


function fillDrop3() {
  // azzero le options del drop
  dropdown3.id("options3");
  document.getElementById("options3").innerHTML =
    null;


  var sceltacountry2 = dropdown2.value();
  var idScelta2 = readstatesId(sceltacountry2)

  // Riempiamo citiesnames
  for (var i = 0; i < cities.cities.length; i++) {
    if (cities.cities[i].state_id == idScelta2) {
      citiesnames.push(cities.cities[i].name);
    }
  }

  // Riempiamo dropdown3 con l'array citiesnames
  for (var i = 0; i < citiesnames.length; i++) {
    dropdown3.option(citiesnames[i]);
  }

  citiesnames = [];
  dropdown3.changed(getCoo);
}


function getCoo(){
  var sceltaCity =  dropdown3.value();
  latCity = readLat(sceltaCity);
  lngCity = readLng(sceltaCity);

  console.log(latCity);
  console.log(lngCity);
}





function readLat(_cooLat){

  for (var i = 0; i < coordinates.coordinates.length; i++) {
      if (coordinates.coordinates[i].name == _cooLat) {
        return (coordinates.coordinates[i].lat);
      }
    }
}

function readLng(_cooLng){

  for (var i = 0; i < coordinates.coordinates.length; i++) {
      if (coordinates.coordinates[i].name == _cooLng) {
        return (coordinates.coordinates[i].lng);
      }
    }
}


// legge l'id del country selezionato
function readId(_countryName) {

  for (var i = 0; i < nations.countries.length; i++) {
    if (nations.countries[i].name == _countryName) {
      return (nations.countries[i].id);
    }
  }
}


// legge l'id del state selezionato
function readstatesId(_statesName) {

  for (var i = 0; i < states.states.length; i++) {
    if (states.states[i].name == _statesName) {
      return (states.states[i].id);
    }
  }
}


// // legge il name della city
// function readCoo(_cityName) {
//
//   for (var i = 0; i < cities.cities.length; i++) {
//     if (cities.cities[i].name == _cityName) {
//       return (cities.cities[i].name);
//     }
//   }
// }



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
