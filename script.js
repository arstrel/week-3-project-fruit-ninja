let bg;
let sword;
const GRAVITY = 1.9;
let fruit = [];
let splat = [];
const fruitImages = ['images/grapes.png', 'images/pear.png', 'images/pineapple.png', 'images/watermelon.png', "images/apple.png"]
const badgeImmages = ['images/badge-1.png', 'images/badge-2.png', 'images/badge-3.png', 'images/badge-4.png', 'images/badge-5.png',
'images/badge-6.png', 'images/badge-7.png', 'images/badge-8.png', 'images/badge-9.png', 'images/badge-10.png']; 
const levels = {
  easy: 0.65,
  medium: 0.55,
  hard: 0.35
}
let currentLevel;
let score = 0;
let lives = 10;
let heartIcon;
let badgeIcon;
let logosCount = 0;
let message = "Collect 10 honor badges to win"
let isOver = false;
let isStarted = false;
let isOverNewGameButton;
let startIcon;
let easyModeIcon;
let isOverEasyModeButton;
let mediumModeIcon;
let isOverMediumModeButton;
let hardModeIcon;
let isOverHardModeButton;
let glowCircle;
let ironNinjaIcon;
let restartIcon;
let waveBg;


function setup() {
  // The background image must be the same size as the parameters
  // into the createCanvas() method. In this program, the size of
  // the image is 1000x600 pixels.
  bg = loadImage('images/dojo-board.jpg');
  hearticon = loadImage('images/Iron-icon2.png');
  startIcon = loadImage('images/new-game-icon-hq.png');
  easyModeIcon = loadImage('images/easy-icon.png');
  mediumModeIcon = loadImage('images/medium-icon.png');
  hardModeIcon = loadImage('images/hard-icon.png');
  glowCircle = loadImage('images/glow-circle-icon.png')
  ironNinjaIcon = loadImage('images/iron-ninja-sm.png');
  restartIcon = loadImage('images/restart-icon.png');
  waveBg = loadImage('images/faded-bg.png');

  for(let i = 0; i < badgeImmages.length; i++) {
    badgeImmages[i] = loadImage(badgeImmages[i])
  }
  currentLevel = levels.medium;
  let canvas = createCanvas(1000, 600);
  canvas.parent('sketch-holder');
  sword = new Blade(color("#FFF0EE"));
  //60 fps by default
  frameRate(30); 
}

function draw() {
  if(!isStarted) {
    background(waveBg);
    drawDifficultyLevel()
    drawLogo(20, 20);
  // if the distance is less than the circle's radius
  if(dist(mouseX, mouseY, 530, 430) < 50)
  {
    isOverNewGameButton = true;
  } else {
    isOverNewGameButton = false;
  }
  //easyModeButton
  if(dist(mouseX, mouseY, 170, 280) < 40)
  {
    isOverEasyModeButton = true;
    image(glowCircle, 60, 170)
  } else {
    isOverEasyModeButton = false;
  }
  //medium mode button
  if(dist(mouseX, mouseY, 520, 185) < 40)
  {
    isOverMediumModeButton = true;
    image(glowCircle, 410, 90)
  } else {
    isOverMediumModeButton = false;
  }
  //hard mode button
  if(dist(mouseX, mouseY, 885, 280) < 40)
  {
    isOverHardModeButton = true;
    image(glowCircle, 760, 170)
    cursor(HAND);
  } else {
    isOverHardModeButton = false;
    cursor(ARROW);
  }
  //selection glow stays when clicked handling
  if(currentLevel == levels.easy) {
    image(glowCircle, 60, 170)
  } else if( currentLevel == levels.medium) {
    image(glowCircle, 410, 90)
  } else if (currentLevel == levels.hard) {
    image(glowCircle, 760, 170)
  }

  //cursor HAND or ARROW handling
  if(dist(mouseX, mouseY, 885, 280) < 40 || dist(mouseX, mouseY, 520, 185) < 40
  || dist(mouseX, mouseY, 170, 280) < 40 || dist(mouseX, mouseY, 530, 430) < 50) 
  {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
  image(startIcon, 430, 330)
  image(easyModeIcon, 120, 200)
  image(mediumModeIcon, 470, 120)
  image(hardModeIcon, 820, 200)
  }
  if(mouseIsPressed) {
    sword.swing(mouseX, mouseY)
  } else {
    sword.clearBlade();
  }
  if(isStarted) { 
    background(bg);
    if(frameCount % 10 === 0) {
    // noise is a random sequence generator producing a more natural ordered, 
    // harmonic succession of numbers compared to the standard random()
    // What? Looks the same to me...
    if(noise(frameCount) > currentLevel) {
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

  //set winning score here
  if(score >= 50) {
    winGame("You Rock !!!");
  }
  if(!isOver) {
    drawMainMessage(message, 38);
  }
  drawScore();
  drawLives();
} // end of isStarted condition

  //this is what makes the sword flicker, but it doesn't work without it, on every frame
  //why?
  if(frameCount % 2 === 0) {
      sword.update();
      sword.draw();
  }
}
//p5 calls this automatically with any click
function mousePressed()
{
  if(isOverNewGameButton)
  {
    isStarted = true;
  }
  if(isOverEasyModeButton) {
    currentLevel = levels.easy
    
  }
  if(isOverMediumModeButton) {
    currentLevel = levels.medium
  }
  if(isOverHardModeButton) {
    currentLevel = levels.hard
  }
  //restarting the game params
  if(isOver && isStarted && dist(mouseX, mouseY, 500, 260) < 110) {
    isOver = false;
    isStarted = false;
    score = 0;
    lives = 10;
    logosCount = 0;
    fruit = [];
    splat = [];
    message = "Collect 10 honor badges to win";
    loop();
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
    drawRestart(); 
    drawMainMessage(msg, 50)
    noLoop();
  }, 700)
  console.log(`Game Over!`);
}
function winGame(msg) {
  message = msg
  isOver = true;
  drawMainMessage(msg, 50)
  setTimeout(()=>{
    drawRestart();
    drawMainMessage(msg, 50)
    noLoop();
  }, 700)
  console.log(`You Rock!`)
}
function fruitGenerator() {
  let bad = (random() > 0.85) //15% chance of bomb
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
function drawDifficultyLevel () {
  fill(0, 0, 0);
  noStroke();
  textSize(32);
  text('Difficulty: ', 370, 40);
  for(key in levels) {
    if(levels[key] == currentLevel) {
      text(key, 505, 40);
    }
  }
}
function drawLogo(x, y) {
  image(ironNinjaIcon, x, y)
}
function drawRestart() {
  background(bg)
  image(restartIcon, 400, 150)
  drawLogo(200, 180); 
}