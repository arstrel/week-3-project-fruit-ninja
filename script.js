let bg;
let sword;
const GRAVITY = 1.9;
let fruit = [];
let colorsArray = ['#FA8072', '#DC143C', '#FF8C00', '#FFFF00', '#00FF00', '#008000', '#00FFFF',
'#00BFFF', '#4169E1', '	#FF00FF', '#9400D3', '#C71585', '#D2691E'];
const DIFFICUTLY = {
  easy: 0.7,
  medium: 0.5,
  hard: 0.3,
  insane: 0.1
}
let score = 0;


function setup() {
  // The background image must be the same size as the parameters
  // into the createCanvas() method. In this program, the size of
  // the image is 1000x600 pixels.
  bg = loadImage('images/dojo-board.jpg');
  createCanvas(1000, 600);

  sword = new Blade(color("#FFF0EE"));
  //60 fps by default
  frameRate(30); 


}

function draw() {
  background(bg);

  if(mouseIsPressed) {
    sword.swing(mouseX, mouseY)
    
  } 

  if(frameCount % 10 === 0) {
    // noise is a random sequence generator producing a more natural ordered, 
    // harmonic succession of numbers compared to the standard random()
    // What? Looks the same to me...
    if(noise(frameCount) > DIFFICUTLY.medium) {
      fruit.push(new Fruit(random(width * 0.2, width * 0.8), height, random(45, 68), randomColor(), random(3, 5) ))
    }
  }



  for(let i = 0; i < fruit.length; i++) {
    fruit[i].update();
    fruit[i].draw();
    sword.checkForSlice(fruit[i])
    
  }


  //this is what makes the sword flicker, but it doesn't work every frame
  //why?
  if(frameCount % 2 === 0) {
      sword.update();
      sword.draw();

  }


}

function randomColor() {
  let r = random(255);
  let g = random(255);
  let b = random(255);
  return color(r,g,b)

}
