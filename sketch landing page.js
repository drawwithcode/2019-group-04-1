var canvas;
var immaginesfondo;
var logo;

function preload(){
  immaginesfondo = loadImage("mappamundo.jpeg");
  logo = loadImage("logo.png");
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.parent('#tela');
}

function draw() {

  //imageMode(CENTER);
  //image(immaginesfondo, width/1.8, height/2, immaginesfondo.width*1.3, immaginesfondo.height*1.3);

  for(var x = 0; x < windowWidth; x += 10) {
    for(var y = 0; y < windowHeight; y += 10) {
      noStroke();
      fill(26, 24, 56);
      ellipse(x, y, 2);
    }
  }

}

function windowResized() {
  canvas = resizeCanvas(windowWidth, windowHeight);
}
