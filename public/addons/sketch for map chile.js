var canvas;
var geomap;
var speak;
var point;
var newpoint;

let pot, fft;

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

var test;
var cityxtest = [];
var cityytest = [];

var testx;
var testy;

var supporters = [];

// var socket;

const mappa = new Mappa("Mapbox", "pk.eyJ1IjoiZ2lvdmVudHVyYSIsImEiOiJjaWdqdnd1aW8wMDQzdnNtNDlyeDVvc283In0.T1Yqmt2Ty9DG5pgMbwE6gQ");

var santiago, beirut, bogota, hongkong;

function preload() {
  nations = loadJSON("countries.json");
  states = loadJSON("states.json");
  cities = loadJSON("cities.json");
  coordinates = loadJSON("coordinates.json");
  pot = loadSound("Files/Audio/Sound.mp3");
  test = loadJSON("/activecities.json");
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
  // socket = io();
// Define which function should be called when a new message
// comes from the server with type "mouseBroadcast"
//socket.on('mouseBroadcast', newDrawing);

//dots
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


    fft = new p5.FFT();
    fft.setInput(pot);
    pot.amp(0.1);
    pot.pause();


    for(var i = 0; i < test.coordinates.length; i++){
      testx = test.coordinates[i].latitude;


        cityxtest.push(testx);
    }
    for(var i = 0; i < test.coordinates.length; i++){
      testy = test.coordinates[i].longitude;

        cityytest.push(testy);
    }
}

// Callback function called when a new message comes from the server
// Data parameters will contain the received data
//function newDrawing(data){
	//console.log('received:', data)
  //newpoint = geomap.latLngToPixel(data.x, data.y);
  //console.log(newpoint.x);
  //console.log(newpoint.y);
	//noStroke();
	//fill('yellow');
	//ellipse(newpoint.x, newpoint.y, 5);
//}




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
  var idScelta1 = readId(sceltacountry1);

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

  // console.log(latCity);
  // console.log(lngCity);
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


// function testCity(_tx, _ty,){
//   this.x = _tx;
//   this.y = _ty;
//
//   this.display = function(){
//     clear();
//     push();
//     fill('#ff8676');
//     ellipse(this.x, this.y, 4);
//     pop();
//   }
// }



function draw() {
  clear();
  push();

for (var i = 0; i < cityxtest.length; i++) {



    pointini = geomap.latLngToPixel(cityxtest[i], cityytest[i]);
    push();
    fill('#ff8676');
    ellipse(pointini.x, pointini.y, 4);
    pop();

}



  var submit = select('#submit');
  submit.mousePressed(support);
  point = geomap.latLngToPixel(latCity, lngCity);
  // fill('yellow');
  // ellipse(point.x, point.y, 6);
  for (let i = 0; i < supporters.length; i++) {
    fill('#e3c709');
    ellipse(point.x, point.y, 8);
    if (pot.isPlaying() == false) {
      pot.play();
    } else {
      pot.pause();
    }
  }
  pop();

  // let spectrum = fft.analyze();
  push();
  // if(pot.isPlaying() == true ){
   santiago = geomap.latLngToPixel(-33.4724728, -70.9100195);
  // //bogota = geomap.latLngToPixel(4.6482837,-74.2478934);
  // //beirut = geomap.latLngToPixel(22.3526632,113.9876144);
  // //hongkong = geomap.latLngToPixel(33.8892133,35.4692628);
   noStroke();
   fill(201, 27, 43, 50);
  // for (var i = 0; i < spectrum.length; i++) {
  //   let d = map(spectrum[i], 0, 0.3, 0.3, 0);
     ellipse(santiago.x, santiago.y, 80);
  //   //ellipse(bogota.x, bogota.y, d);
  //   //ellipse(beirut.x, beirut.y, d);
  //   //ellipse(hongkong.x, hongkong.y, d);
    // }
    //  console.log(santiago.x);
    //  console.log(santiago.y);
 // }
  pop();

}

function support() {
  for (var i = 0; i < 1; i++) {
    supporters.push("a_supporter");
  }

  }
  function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
