let snake;
let food;
let gridSize = 20;

function setup() {
  createCanvas(400, 400);
  snake = new Snake();
  foodLocation();
  frameRate(10);
}

function draw() {
  background(220);
  
  snake.update();
  snake.display();
  
  if (snake.eat(food)) {
    foodLocation();
  }
  
  fill(255, 0, 0);
  rect(food.x, food.y, gridSize, gridSize);
}

function foodLocation() {
  let cols = floor(width / gridSize);
  let rows = floor(height / gridSize);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(gridSize);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.setDirection(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDirection(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDirection(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.setDirection(-1, 0);
  }
}

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  
  this.update = function() {
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);
    
    this.x += this.xspeed * gridSize;
    this.y += this.yspeed * gridSize;
    
    this.x = constrain(this.x, 0, width - gridSize);
    this.y = constrain(this.y, 0, height - gridSize);
  };
  
  this.display = function() {
    fill(0);
    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, gridSize, gridSize);
    }
    rect(this.x, this.y, gridSize, gridSize);
  };
  
  this.eat = function(pos) {
    let d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  };
  
  this.setDirection = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };
}
