var pidgeons = [];
var pidgeonsnumber = 100;
var c = 0;
var awardtime = 200;
var awardmemory = 10;
var awardmessage = false;
var distraction = 0.05;

var menuDiv;
var awardTimeSlider;
var awardMemorySlider;
var distractionSlider;
var descriptionP1;
var descriptionP2;
var descriptionP3;

function setup() {
  createCanvas(800, 600);
  for (var i = 0; i < pidgeonsnumber; i++) {
    pidgeons.push(new Pidgeon());
  }
  textSize(60);
  textAlign(CENTER);

  menuDiv = createDiv('');
  
  descriptionP1 = createP('Award time:');
  awardTimeSlider = createSlider(1, 200, awardtime, 1);
  descriptionP1.child(awardTimeSlider);
  
  descriptionP2 = createP('Pidgeon memory capacity:');
  awardMemorySlider = createSlider(1, 200, awardmemory, 1);
  descriptionP2.child(awardMemorySlider);
  
  descriptionP3 = createP('Pidgeon distraction:');
  distractionSlider = createSlider(0, 1, distraction, 0.01);
  descriptionP3.child(distractionSlider);

  menuDiv.child(descriptionP1);
  menuDiv.child(descriptionP2);
  menuDiv.child(descriptionP3);
}

function draw() {
  awardtime = awardTimeSlider.value();
  awardmemory = awardMemorySlider.value();
  distraction = distractionSlider.value();
  
  c++;
  background(20);
  
  if (c % awardtime == 0) {
    setAward();
    pidgeons.forEach(function(pidgeon) {
      pidgeon.award(awardmemory);
    });
  }
  
  pidgeons.forEach(function(pidgeon) {
    pidgeon.move();
    pidgeon.draw(0, 0);
  });

  if (awardmessage) showAward();
}

function setAward() {
  awardmessage = true;
  setTimeout(function() {
    awardmessage = false;
  }, 1000);
}

function showAward() {
  fill(240, 50, 50);
  text('GOOD JOB!', width / 2, height / 2);
}

class Pidgeon {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.speed = 4;
    this.size = 4;
    this.moves = [];
    this.color = color(random(60, 255));
  }
  
  award(memory) {
    for (var i = 0; i < this.moves.length; i++) {
      var j = i % memory;
      this.moves[i] = this.moves[this.moves.length - memory + j];
    }
  }
  
  move() {
    var m = [];
    var j = c % awardtime;
    
    if (random() < distraction) {
      m = [
        random(-this.speed, this.speed),
        random(-this.speed, this.speed)
      ];
    } else {
      if (this.moves[j] !== undefined) {
        m = this.moves[j];
      } else {
        m = [
          random(-this.speed, this.speed),
          random(-this.speed, this.speed)
        ];
      }
    }
    
    this.x += m[0];
    this.y += m[1];
    
    this.moves[j] = m;
    
    this.checkEdges();
  }
  
  checkEdges() {
    if (this.x >= width) {
      this.x = this.x - width;
    } else if (this.x < 0) {
      this.x = width - this.x;
    }
    
    if (this.y >= height) {
      this.y = this.y - height;
    } else if (this.y < 0) {
      this.y = height - this.y;
    }
  }
  
  draw() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}
