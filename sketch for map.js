var canvas;
var geomap;
var speak;

function preload(){
  speak = loadImage("speaker.png");
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.parent("#tela");

  var mappa = new Mappa("Mapbox", "pk.eyJ1IjoiZ2lvdmVudHVyYSIsImEiOiJjaWdqdnd1aW8wMDQzdnNtNDlyeDVvc283In0.T1Yqmt2Ty9DG5pgMbwE6gQ");

  var options = {
    lat: 0,
    lng: 0,
    zoom: 3,
    studio: true,
    style:"mapbox://styles/gioventura/ck412d3am0isi1co2uwr2fhnd"
  }

  geomap = mappa.tileMap(options);
  geomap.overlay(canvas);

  for(var x = 0; x < windowWidth; x += 10) {
    for(var y = 0; y < windowHeight; y += 10) {
      noStroke();
      fill(26, 24, 56);
      ellipse(x, y, 2);
    }
  }

  image(speak,20,height-50,30,30);
}

function draw() {

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
