var canvas;
var immaginesfondo;
var logo;
var icon;
var lafontreg;
var lafontbold;
var i = 4;

function preload(){
  immaginesfondo = loadImage("mappamundo.jpeg");
  logo = loadImage("logo.png");
  icon = loadImage("ICON.png");
  lafontreg = loadFont('Musketregular.otf');
  lafontbold = loadFont('Musketbold.otf');
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.parent('#tela');

  angleMode(DEGREES);
}

function draw() {

  imageMode(CENTER);
  image(immaginesfondo, width/1.8, height/2, immaginesfondo.width*1.3, immaginesfondo.height*1.3);
  push();
  for(var x = 0; x < windowWidth; x += 10) {
    for(var y = 0; y < windowHeight; y += 10) {
      noStroke();
      fill(26, 24, 56);
      ellipse(x, y, 2);
    }
  }

  pop();

  push();
  translate(0,height/2);
  ellipseMode(CENTER);
  noFill();
  strokeWeight(4);
  stroke('white');
  ellipse(0,0, height*1.2);
  pop();

  push();
  translate(400, 200);
  textSize(30);
  textFont(lafontreg);
  fill('white');
  text('COLOMBIA', 30, 10);
  rotate(frameCount*i);
  imageMode(CENTER);
  image(icon, 0, 0, 30, 30);
  pop();

  push();
  translate(410, 260);
  textSize(30);
  textFont(lafontreg);
  fill('white');
  text('CHILE', 30, 10);
  rotate(frameCount*i);
  imageMode(CENTER);
  image(icon, 0, 0, 30, 30);
  pop();

  push();
  translate(420, 320);
  textSize(30);
  textFont(lafontreg);
  fill('white');
  text('HONG KONG', 30, 10);
  rotate(frameCount*i);
  imageMode(CENTER);
  image(icon, 0, 0, 30, 30);
  pop();
}


function windowResized() {
  canvas = resizeCanvas(windowWidth, windowHeight);
}
