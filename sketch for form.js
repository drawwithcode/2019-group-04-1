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
var sceltacountry;

function preload() {
  data = loadJSON("world-cities.json");
  nations = loadJSON("countries.json");
  states = loadJSON("states.json");
  cities = loadJSON("cities.json");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
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


  dropdown1.changed(settaValue);
}


function draw() {

}

function settaValue() {
  var sceltacountry = dropdown1.value();
  var idScelta = readId(sceltacountry)

  // Riempiamo statesnames
  for (var i = 0; i < states.states.length; i++) {
   if (states.states[i].country_id == idScelta) {
  statesnames.push(states.states[i].name);
   }
  }

  // Riempiamo dropdown1 con l'array allthecountrynames
  for (var i = 0; i < statesnames.length; i++) {
    dropdown2.option(statesnames[i]);
  }

  // console.log(statesnames);


}


function readId(_countryName) {

  for (var i = 0; i < nations.countries.length; i++) {
    if (nations.countries[i].name == _countryName) {
      return (nations.countries[i].id);
    }
  }
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
