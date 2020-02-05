var canvas;
var geomap;
var speak;
var point;


var dropdown1;
var dropdown2;
var dropdown3;
var canvas;
var data;
var nations;
var states;
var cities;
var allthecountrynames = [];
var statesnames = [];
var citiesnames = [];
var sceltacountry1;
var sceltacountry2;
var coordinates;
var arreydeprova = [];
var latCity = 50;
var lngCity = 30;

var supporters = [];

const mappa = new Mappa("Mapbox", "pk.eyJ1IjoiZ2lvdmVudHVyYSIsImEiOiJjaWdqdnd1aW8wMDQzdnNtNDlyeDVvc283In0.T1Yqmt2Ty9DG5pgMbwE6gQ");


function preload() {
  nations = loadJSON("countries.json");
  states = loadJSON("states.json");
  cities = loadJSON("cities.json");
  coordinates = loadJSON("coordinates.json");
}

const options = {
  lat: 0,
  lng: 0,
  zoom: 3,
  studio: true,
  style: "mapbox://styles/gioventura/ck412d3am0isi1co2uwr2fhnd"
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("#tela");

  geomap = mappa.tileMap(options);
  geomap.overlay(canvas);


  for (var x = 0; x < windowWidth; x += 10) {
    for (var y = 0; y < windowHeight; y += 10) {
      noStroke();
      fill(26, 24, 56);
      ellipse(x, y, 2);
    }
  }


  dropdown1 = createSelect();
  dropdown1.parent('#form');
  dropdown1.position(60, 160);
  dropdown2 = createSelect();
  dropdown2.parent('#form');
  dropdown2.position(60, 240);
  dropdown3 = createSelect();
  dropdown3.parent('#form');
  dropdown3.position(60, 320);
  for (var i = 0; i < nations.countries.length; i++) {
    allthecountrynames.push(nations.countries[i].name);
  }
  // Riempiamo dropdown1 con l'array allthecountrynames
  for (var i = 0; i < allthecountrynames.length; i++) {
    dropdown1.option(allthecountrynames[i]);

  }
  dropdown1.changed(fillDrop2);



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


function getCoo() {
  var sceltaCity = dropdown3.value();
  latCity = readLat(sceltaCity);
  lngCity = readLng(sceltaCity);

  console.log(latCity);
  console.log(lngCity);
}



function readLat(_cooLat) {

  for (var i = 0; i < coordinates.coordinates.length; i++) {
    if (coordinates.coordinates[i].name == _cooLat) {
      return (coordinates.coordinates[i].lat);
    }
  }
}

function readLng(_cooLng) {

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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  var submit = select('#submit');
  submit.mousePressed(support);
  point = geomap.latLngToPixel(latCity, lngCity);
  // fill('yellow');
  // ellipse(point.x, point.y, 6);
  for (let i = 0; i < supporters.length; i++) {
    fill('#ff8676');
    ellipse(point.x, point.y, 4);
  }

  console.log(point.x);
  console.log(point.y);
  console.log(supporters.length);
  console.log(supporters);

}

function support() {
  for (var i = 0; i < 1; i++) {
    supporters.push("a_supporter");
  }

}