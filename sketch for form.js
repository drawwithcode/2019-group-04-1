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
    allthenames = nations.countries[i].name; // e seleziona solo l'ultimo stato porcoddio
  }
  console.log(allthenames);

  dropdown = createSelect();
  dropdown.position(10, 10);
  dropdown.option(allthenames);

}

function draw() {

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
