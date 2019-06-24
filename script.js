let bg;
let sword;
const GRAVITY = 1.9;
let fruit = [];
let splat = [];
const fruitImages = ['images/grapes.png', 'images/pear.png', 'images/pineapple.png', 'images/watermelon.png', "images/apple.png"]
const badgeImmages = ['images/badge-1.png', 'images/badge-2.png', 'images/badge-3.png', 'images/badge-4.png', 'images/badge-5.png',
'images/badge-6.png', 'images/badge-7.png', 'images/badge-8.png', 'images/badge-9.png', 'images/badge-10.png']; 
const DIFFICUTLY = {
  easy: 0.8,
  medium: 0.55,
  hard: 0.4,
  insane: 0.15
}
let score = 0;
let lives = 10;
let heartIcon;
let badFruitImg;
let ironIcon;
let badgeIcon;
let logosCount = 0;
let message = "Collect 10 honor badges to win"
let isOver = false;

function setup() {
  // The background image must be the same size as the parameters
  // into the createCanvas() method. In this program, the size of
  // the image is 1000x600 pixels.
  bg = loadImage('images/dojo-board.jpg');
  hearticon = loadImage('images/lives-icon.png');
  ironIcon = loadImage('images/Iron-icon2.png');
  badFruitImg = loadImage('images/bomb-icon.png');
  for(let i = 0; i < badgeImmages.length; i++) {
    badgeImmages[i] = loadImage(badgeImmages[i])
  }
  createCanvas(1000, 600);
  sword = new Blade(color("#FFF0EE"));
  //60 fps by default
  frameRate(30); 
}

function draw() {
  background(bg);
  if(mouseIsPressed) {
    sword.swing(mouseX, mouseY)
    
  } else {
    sword.clearBlade();
  }

  if(frameCount % 10 === 0) {
    // noise is a random sequence generator producing a more natural ordered, 
    // harmonic succession of numbers compared to the standard random()
    // What? Looks the same to me...
    if(noise(frameCount) > DIFFICUTLY.medium) {
      fruit.push(fruitGenerator())
    }
  }

  for(let i = splat.length - 1; i >= 0; i--) {
    image(splat[i].stainPic, splat[i].x, splat[i].y)
  }
  for(let i = fruit.length - 1; i >= 0; i--) {
    fruit[i].update();
    fruit[i].draw();
    
    if(!fruit[i].visible ) {
      if(!fruit[i].isSliced && !fruit[i].isBad) {
        lives -= 1;
      }
    } else if (fruit[i].visible && sword.checkForSlice(fruit[i])) {
      score += 1;
      if (score % 5 == 0) {
        logosCount += 1;
      }
    }
   
    if(fruit[i].isSliced && !fruit[i].isBad) {
      splat.push(fruit[i])
      fruit.splice(i, 1)
    }
    if(fruit[i] && !fruit[i].visible) {
      fruit.splice(i, 1)
    }

  }
  if(lives < 1) {
    endGame("Game Over, gaijin!")
  }
  if(score >= 50) {
    winGame("You Rock !!!");
  }
  if(!isOver) {
    drawMainMessage(message, 38);
  }
  drawScore();
  drawLives();
  
  //this is what makes the sword flicker, but it doesn't work without it, on every frame
  //why?
  if(frameCount % 2 === 0) {
      sword.update();
      sword.draw();
  }
}
function getImage() {
  let randImage = loadImage(random(fruitImages))
  return randImage
}
function endGame(msg) {
  message = msg;
  isOver = true;
  drawMainMessage(msg, 50)
  setTimeout(()=>{
    drawMainMessage(msg, 50)
    noLoop();
  }, 500)
  console.log(`Game Over!`);
}
function winGame(msg) {
  message = msg
  isOver = true;
  drawMainMessage(msg, 50)
  setTimeout(()=>{
    drawMainMessage(msg, 50)
    noLoop();
  }, 500)
  console.log(`You Rock!`)
}
function fruitGenerator() {
  let bad = (random() > 0.99)
  return new Fruit(bad, getImage())
}
function drawScore() {
  fill(0, 102, 153);
  noStroke();
  textSize(30);
  text('Score: ', 10, 40);
  text(score, 100, 40);

  let yIcon = 60;

  for(let i = 0; i < logosCount; i++) {
    noStroke();
    image(badgeImmages[i], 18, yIcon)
    yIcon += 50;
  }
} 
function drawLives() {
  fill(0, 102, 153);
  noStroke();
  textSize(30);
  text(lives, 860, 40);
  text('Lives ', 900, 40);
  let yIcon = 75;
  for(let i = 0; i < lives; i++) {
    noStroke();
    image(hearticon, 935, yIcon)
    yIcon += 50;
  }
}
function drawMainMessage(msg, size) {
  fill(33, 125, 184)
  noStroke();
  textSize(size);
  text(msg, 225, 40);
}
