// ?? Why is it flickering ??
//because it dwars and updates every other frame. but it doesn't work without it at all
class Blade{
  constructor (color) {
    this.swipes = []; //storing vectors 
    this.swipeSizes = [];
    this.color = color; //setting the color for future refference
  }

  update() {
    //fade swipe
    if(this.swipes.length > 10 ) {
      //if the tail becomes too long which happens if the mouse 
      //moves slow then we delete tail twice as fast
      this.swipes.splice(0, 4); 
    }
    else if(this.swipes.length > 6 ) {
      this.swipes.splice(0, 2); //delete last value
    }
    else if(this.swipes.length > 0) {
      this.swipes.splice(0, 1); //delete last value
    }
  }

  draw() {
    for(let i = 0; i < this.swipes.length; i++) {
      //map(value, start1, stop1, start2, stop2, [withinBounds])
      let width = map(i, 0, this.swipes.length , 10, 20) 
      noStroke(); //eliminates black border around cursor shadow circles
      fill(this.color);
      ellipse(this.swipes[i].x, this.swipes[i].y, width);
    }
  }

  swing(x, y) {
    this.swipes.push(createVector(x,y))
  }

  checkForSlice(fruit) {
  //   sometimes the fruit is in between two recorded points but none of the recorded
  //   points are directly on the fruit.
  //   if (distance from first recorder point to the cnter of the fruit) + 
  //   (distance from the second recorded point to the center of the fruit ) =
  //   (distance between first and second recorded points) then the fruit isSliced
  //   BUT that will require to slice perfectly in the middle of the fruit

    if(fruit.isSliced || this.swipes.length < 2) {
      return false;
    }
    let length = this.swipes.length;   
    let d1 = dist(this.swipes[length - 1].x, this.swipes[length - 1].y, fruit.x, fruit.y);
    let d2 = dist(this.swipes[length - 2].x, this.swipes[length - 2].y, fruit.x, fruit.y);
    let d3 = dist(this.swipes[length - 1].x, this.swipes[length - 1].y, this.swipes[length - 2].x, this.swipes[length - 2].y)

    let result = d1 < fruit.size || ((d1 < d3 && d2 < d3) && (d3 < width / 4));
    fruit.isSliced = result;
    
    return result
  }
  clearBlade() {
    this.swipes.splice(0, 1); 
    this.swipes.splice(0, 1); 
  }
}