class Fruit {
  constructor( bad, picture) {
    this.size = 80;
    //coordinates and velocity
    this.x = random(width * 0.15, width * 0.85);
    this.y = height;
    this.xV = randomXV(this.x);
    this.yV = random(-34, -42);
    this.isSliced = false;
    this.visible = true;
    this.isBad = bad;
    this.picture = picture;
    this.badFruitPic = loadImage('images/bomb-icon2.png');
    this.stainPic = loadImage('images/stain-icon.png');
  }
 
  draw() {
    if(this.isBad) {
      image(this.badFruitPic, this.x, this.y)
    }  
    if(!this.isBad) {  
      image(this.picture, this.x, this.y)
    } 
    if(this.isBad && this.isSliced) {
      endGame('Stay away from bombs!')
    } 
  }

  update () {
    if(this.isBad) {
      this.size = 45;
    }
    this.x += this.xV
    this.y += this.yV
    
    this.xV *= 0.97;
    this.yV += GRAVITY 
      
    if(this.y > height) {
      this.visible = false;
    }
  }
  drawSplat() {
    image(this.stainPic, this.x, this.y)
    
  }
}

function randomXV (x) {
  //if the fruit appears on the left part of the screen then the curve is to
  //the right, if it appears at the right half of the screen then to the left

  if (x > width / 2) {
    return random(-12, -4);
  } else {
    return random(12, 4);
  }
}

function clearColor(col) {
  let r = red(col)
  let g = green(col)
  let b = blue(col)

  return color(r,g,b,0)
}

