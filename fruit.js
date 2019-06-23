class Fruit {
  constructor(x, y, size, color, speed) {
    this.color = color;
    this.speed = speed;
    this.size = size;
    //coordinates and velocity
    this.x = x;
    this.y = y;
    this.xV = randomXV(x);
    this.yV = random(-28, -42);

    this.isSliced = false;
    this.visible = true;
  }

  draw() {
    noStroke(); 
    if(this.isSliced) {
      this.color = lerpColor(this.color, clearColor(this.color), 0.3)
    } 
    fill(this.color);
    ellipse(this.x, this.y, this.size)
    
    

  }

  update () {
    this.x += this.xV
    this.y += this.yV

    this.xV *= 0.97;
    this.yV += GRAVITY 

    if(this.y > height) {
      this.visible = false;
    }
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

