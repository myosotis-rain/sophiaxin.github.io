// Whisper Interface - Floating Dust Motes & Silk Fibers
// Subtle paper texture particles with gentle drift and low contrast

let dustMotes = [];
let silkFibers = [];
let numDustMotes = 40;
let numSilkFibers = 15;
let mouseTrails = [];
let mouseHasMoved = false;
let heroContent;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('hero-canvas');
  canvas.style('display', 'block');
  
  // Create floating dust motes
  for (let i = 0; i < numDustMotes; i++) {
    dustMotes.push(new DustMote());
  }
  
  // Create silk fibers
  for (let i = 0; i < numSilkFibers; i++) {
    silkFibers.push(new SilkFiber());
  }
  
  // Get hero content element
  heroContent = document.querySelector('.hero-content');
}

function draw() {
  clear(); // Transparent background
  
  // Update and display mouse trails first
  updateMouseTrails();
  
  // Update and display dust motes
  for (let mote of dustMotes) {
    mote.update();
    mote.display();
  }
  
  // Update and display silk fibers
  for (let fiber of silkFibers) {
    fiber.update();
    fiber.display();
  }
}

function updateMouseTrails() {
  // Update existing mouse trails
  for (let i = mouseTrails.length - 1; i >= 0; i--) {
    let trail = mouseTrails[i];
    trail.life -= 1.5;
    
    if (trail.life <= 0) {
      mouseTrails.splice(i, 1);
    } else {
      // Draw subtle trail point
      let alpha = map(trail.life, 0, 255, 0, 25);
      noStroke();
      fill(179, 167, 207, alpha);
      ellipse(trail.x, trail.y, trail.size * (trail.life / 255));
    }
  }
}

function mouseMoved() {
  if (!mouseHasMoved) {
    mouseHasMoved = true;
    // Reveal hero content
    if (heroContent) {
      heroContent.classList.add('visible');
    }
  }
  
  // Add subtle trails near mouse
  if (frameCount % 5 === 0) {
    mouseTrails.push({
      x: mouseX + random(-8, 8),
      y: mouseY + random(-8, 8),
      size: random(1, 3),
      life: 180
    });
  }
}

class DustMote {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.baseX = this.x;
    this.baseY = this.y;
    this.vx = random(-0.1, 0.1);
    this.vy = random(-0.15, 0.05);
    this.size = random(1, 3);
    this.time = random(1000);
    this.phase = random(TWO_PI);
    this.opacity = random(0.1, 0.3);
  }
  
  update() {
    // Very gentle floating motion
    this.time += 0.005;
    this.x = this.baseX + sin(this.time + this.phase) * 8;
    this.y = this.baseY + cos(this.time * 0.7 + this.phase) * 5;
    
    // Slow drift
    this.baseX += this.vx;
    this.baseY += this.vy;
    
    // Very subtle mouse interaction
    let mouseDistance = dist(mouseX, mouseY, this.x, this.y);
    if (mouseDistance < 80) {
      let angle = atan2(this.y - mouseY, this.x - mouseX);
      let force = map(mouseDistance, 0, 80, 0.5, 0);
      this.baseX += cos(angle) * force;
      this.baseY += sin(angle) * force;
    }
    
    // Wrap around edges
    if (this.baseX < -10) this.baseX = width + 10;
    if (this.baseX > width + 10) this.baseX = -10;
    if (this.baseY < -10) this.baseY = height + 10;
    if (this.baseY > height + 10) this.baseY = -10;
  }
  
  display() {
    // Subtle dust mote with low contrast
    let alpha = this.opacity * map(sin(this.time * 3), -1, 1, 0.5, 1);
    noStroke();
    fill(179, 167, 207, alpha * 255);
    ellipse(this.x, this.y, this.size);
  }
}

class SilkFiber {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.endX = this.x + random(-20, 20);
    this.endY = this.y + random(-15, 15);
    this.baseX = this.x;
    this.baseY = this.y;
    this.vx = random(-0.08, 0.08);
    this.vy = random(-0.12, 0.03);
    this.time = random(1000);
    this.phase = random(TWO_PI);
    this.opacity = random(0.08, 0.2);
    this.length = random(10, 25);
  }
  
  update() {
    // Very gentle floating motion
    this.time += 0.003;
    let offsetX = sin(this.time + this.phase) * 5;
    let offsetY = cos(this.time * 0.6 + this.phase) * 3;
    
    this.x = this.baseX + offsetX;
    this.y = this.baseY + offsetY;
    this.endX = this.x + sin(this.time * 0.8) * this.length;
    this.endY = this.y + cos(this.time * 0.5) * (this.length * 0.6);
    
    // Slow drift
    this.baseX += this.vx;
    this.baseY += this.vy;
    
    // Wrap around edges
    if (this.baseX < -30) this.baseX = width + 30;
    if (this.baseX > width + 30) this.baseX = -30;
    if (this.baseY < -20) this.baseY = height + 20;
    if (this.baseY > height + 20) this.baseY = -20;
  }
  
  display() {
    // Silk fiber as subtle line
    let alpha = this.opacity * map(sin(this.time * 2), -1, 1, 0.7, 1);
    stroke(200, 190, 218, alpha * 255);
    strokeWeight(0.5);
    line(this.x, this.y, this.endX, this.endY);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // Redistribute dust motes
  for (let mote of dustMotes) {
    mote.baseX = random(width);
    mote.baseY = random(height);
  }
  
  // Redistribute silk fibers
  for (let fiber of silkFibers) {
    fiber.baseX = random(width);
    fiber.baseY = random(height);
  }
}