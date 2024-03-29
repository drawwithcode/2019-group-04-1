var canvas;
var immaginesfondo;
var logo;
var icon;
var lafontreg;
var lafontbold;
var i = 4;


var chile;
var imagechile;
var colombia;
var imagecolombia;
var hongkong;
var imagehongkong;
var lebanon;
var imagelebanon;

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

  frameRate(100);
  angleMode(DEGREES);

  chile = select('#menuchile');
  imagechile = select('#chile')
  chile.mouseOver(appearChile);
  chile.mouseOut(disappearChile);

  colombia = select('#menucolombia');
  imagecolombia = select('#colombia')
  colombia.mouseOver(appearColombia);
  colombia.mouseOut(disappearColombia);

  hongkong = select('#menuhongkong');
  imagehongkong = select('#hongkong')
  hongkong.mouseOver(appearHong);
  hongkong.mouseOut(disappearHong);

  lebanon = select('#menulebanon');
  imagelebanon = select('#lebanon')
  lebanon.mouseOver(appearLebanon);
  lebanon.mouseOut(disappearLebanon);

}

function draw() {

  push();
  for(var x = 0; x < windowWidth; x += 10) {
    for(var y = 0; y < windowHeight; y += 10) {
      noStroke();
      fill(26, 24, 56);
      ellipse(x, y, 2);
    }
  }
  pop();
}


function windowResized() {
  canvas = resizeCanvas(windowWidth, windowHeight);
}

function appearChile() {
  imagechile.style('display', 'block');
}
function disappearChile() {
  imagechile.style('display', 'none');
}


function appearColombia() {
  imagecolombia.style('display', 'block');
}
function disappearColombia() {
  imagecolombia.style('display', 'none');
}


function appearHong() {
  imagehongkong.style('display', 'block');
}
function disappearHong() {
  imagehongkong.style('display', 'none');
}


function appearLebanon() {
  imagelebanon.style('display', 'block');
}
function disappearLebanon() {
  imagelebanon.style('display', 'none');
}
