var canvas;
var data;
var nations;
var states;
var cities;
var dropdown;
var allthenames = [];

function preload(){
  data = loadJSON("world-cities.json");
  nations = loadJSON("countries.json");
  states = loadJSON("states.json");
  cities = loadJSON("cities.json");
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.parent("#tela");

//select all elements with class "name" inside the .json file
  for(var i = 0; i < nations.countries.length; i++){
    allthenames.push(nations.countries[i].name); // e seleziona solo l'ultimo stato porcoddio
  }
  console.log(nations.countries.length);

  dropdown = createSelect();
  dropdown.position(10, 10);

  for(var i = 0; i < allthenames.length; i++){
  dropdown.option(allthenames[i]); // e seleziona solo l'ultimo stato porcoddio
  }
}

function draw() {

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
