var canvas;
var data;

function preload(){
  data = loadJSON("world-cities.json");

}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.parent("#tela");
}

function draw() {

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
