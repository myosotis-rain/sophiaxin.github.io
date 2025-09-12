// p5.js Creative Sketch for Portfolio
// Dynamic particle system with sophisticated interactions and visual hierarchy

let particles = [];
let numParticles = 12;  // Increased for richer composition
let noiseOffset = 0;
let canvas;
let breathingOffset = 0;
let mouseInfluence = { x: 0, y: 0, strength: 0, ripples: [] };
let centerForce = { strength: 0, target: null };
let globalEnergy = 0;

// Gentle Delighted Purple-Blue Palette with Soft Energy
let colors = [
  [140, 160, 220, 140], // gentle periwinkle
  [160, 140, 200, 135], // soft lavender
  [120, 150, 200, 145], // delicate sapphire
  [180, 160, 220, 130], // light amethyst
  [150, 180, 240, 140], // cheerful sky blue
  [200, 170, 210, 125], // tender mauve
  [130, 160, 190, 150], // calm navy
  [210, 180, 230, 120], // sweet orchid
  [110, 140, 180, 155], // peaceful blue
  [170, 130, 180, 145], // dreamy indigo
  [140, 170, 210, 140], // joyful sky
  [190, 160, 200, 135], // serene purple
];

function setup() {
  // Match updated container size
  canvas = createCanvas(320, 320);
  
  // Try to attach to hero canvas container immediately
  let heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas) {
    canvas.parent('hero-canvas');
  }
  
  // Initialize particles with better distribution
  initializeParticles();
  noFill();
}

function initializeParticles() {
  particles = []; // Clear existing particles
  for (let i = 0; i < numParticles; i++) {
    let angle = random(TWO_PI);
    // Much wider distribution spanning most of the circle
    let radius = random(width * 0.05, width * 0.48);
    let x = width/2 + cos(angle) * radius;
    let y = height/2 + sin(angle) * radius;
    particles.push(new Particle(x, y));
  }
}

function draw() {
  // Dynamic background with subtle energy field
  clear();
  
  // Global energy pulse affects entire system
  globalEnergy = sin(breathingOffset * 0.3) * 0.5 + 0.5;
  
  // Subtle energy field background
  drawEnergyField();
  
  // Update mouse influence ripples
  updateRipples();
  
  // Update and draw particles with enhanced interactions
  for (let particle of particles) {
    particle.update();
    particle.connect(particles);
    particle.display();
  }
  
  // Draw interactive ripples on top
  drawRipples();
  
  breathingOffset += 0.018;
  noiseOffset += 0.01;
}

// Enhanced visual systems for dynamic interaction

function drawEnergyField() {
  // Ethereal background field that spans the entire circle
  let centerX = width / 2;
  let centerY = height / 2;
  
  // Multiple ethereal layers for dreamy depth
  for (let r = 0; r < 4; r++) {
    let radius = (r + 1) * 60 + globalEnergy * 25 + sin(breathingOffset * 0.3 + r) * 10;
    let alpha = (5 - r) * globalEnergy * 0.4 + sin(breathingOffset * 0.5 + r * 0.7) * 2;
    
    // Ethereal colors with subtle shifting
    let hueShift = sin(breathingOffset * 0.2 + r * 0.5) * 10;
    fill(160 + hueShift, 170 + hueShift * 0.8, 210 + hueShift * 0.5, alpha);
    noStroke();
    ellipse(centerX, centerY, radius * 2);
  }
  
  // Dreamy outer halo that reaches circle edges
  let outerAlpha = globalEnergy * 0.15 + sin(breathingOffset * 0.4) * 0.05;
  fill(180, 190, 220, outerAlpha);
  ellipse(centerX, centerY, min(width, height) * 0.95);
}

function updateRipples() {
  // Update and fade mouse interaction ripples
  for (let i = mouseInfluence.ripples.length - 1; i >= 0; i--) {
    let ripple = mouseInfluence.ripples[i];
    ripple.radius += ripple.speed;
    ripple.alpha *= 0.95;
    
    if (ripple.alpha < 5) {
      mouseInfluence.ripples.splice(i, 1);
    }
  }
}

function drawRipples() {
  // Draw gentle expanding ripples that complement the design
  for (let ripple of mouseInfluence.ripples) {
    stroke(160, 170, 210, ripple.alpha * 0.7);
    strokeWeight(1.5);
    noFill();
    ellipse(ripple.x, ripple.y, ripple.radius * 2);
    
    // Subtle inner ripple
    stroke(180, 190, 220, ripple.alpha * 0.4);
    strokeWeight(1);
    ellipse(ripple.x, ripple.y, ripple.radius * 1.5);
  }
}

// Dynamic mouse interaction with sophisticated effects
function mouseMoved() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    // Smooth mouse influence tracking
    mouseInfluence.x = lerp(mouseInfluence.x, mouseX, 0.15);
    mouseInfluence.y = lerp(mouseInfluence.y, mouseY, 0.15);
    mouseInfluence.strength = lerp(mouseInfluence.strength, 1, 0.12);
    
    // Create ripple effect on mouse movement
    if (frameCount % 8 === 0) {
      mouseInfluence.ripples.push({
        x: mouseX,
        y: mouseY,
        radius: 5,
        alpha: 60,
        speed: 2
      });
    }
    
    // Enhanced particle influence with attraction/repulsion zones
    for (let particle of particles) {
      let distance = dist(mouseX, mouseY, particle.pos.x, particle.pos.y);
      
      if (distance < 80) {
        // Close range: gentle repulsion
        let force = map(distance, 0, 80, 0.15, 0);
        let direction = createVector(particle.pos.x - mouseX, particle.pos.y - mouseY);
        direction.normalize();
        direction.mult(force);
        particle.vel.add(direction);
        
        // Enhanced visual feedback
        particle.targetSize = particle.baseSize + 6;
        particle.energyBoost = 1.5;
      } else if (distance < 150) {
        // Medium range: subtle attraction
        let force = map(distance, 80, 150, 0, 0.08);
        let direction = createVector(mouseX - particle.pos.x, mouseY - particle.pos.y);
        direction.normalize();
        direction.mult(force);
        particle.vel.add(direction);
        
        particle.targetSize = particle.baseSize + 3;
        particle.energyBoost = 1.2;
      } else {
        particle.targetSize = particle.baseSize;
        particle.energyBoost = lerp(particle.energyBoost || 1, 1, 0.1);
      }
      
      // Smooth transitions
      particle.size = lerp(particle.size, particle.targetSize, 0.15);
    }
  } else {
    mouseInfluence.strength = lerp(mouseInfluence.strength, 0, 0.08);
    
    // Reset all particles
    for (let particle of particles) {
      particle.targetSize = particle.baseSize;
      particle.energyBoost = lerp(particle.energyBoost || 1, 1, 0.1);
    }
  }
}

// Particle class with refined movement and visual design

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 0.4;  // Increased for more dynamic movement
    this.baseSize = random(8, 16);  // Larger, more varied sizes
    this.size = this.baseSize;
    this.targetSize = this.baseSize;
    this.energyBoost = 1;
    
    // Sophisticated color selection with hierarchy
    this.colorIndex = floor(random(colors.length));
    this.color = colors[this.colorIndex];
    this.secondaryColorIndex = (this.colorIndex + floor(random(2, 5))) % colors.length;
    this.secondaryColor = colors[this.secondaryColorIndex];
    
    // Enhanced animation properties
    this.angle = random(TWO_PI);
    this.noiseOffsetX = random(1000);
    this.noiseOffsetY = random(1000);
    this.pulseOffset = random(TWO_PI);
    this.colorCycle = random(TWO_PI);
    this.rotationSpeed = random(0.008, 0.025);
    this.personalityFactor = random(0.8, 1.2);  // Individual character
    this.connectionStrength = random(0.8, 1.5);
  }
  
  update() {
    // Complex multi-layered movement system
    let primaryNoise = noise(this.noiseOffsetX + noiseOffset * this.personalityFactor);
    let secondaryNoise = noise(this.noiseOffsetY + noiseOffset * this.personalityFactor);
    let tertiaryNoise = noise(this.noiseOffsetX * 0.5 + noiseOffset * 2);
    
    // Balanced flow field movement
    let flowAngle = primaryNoise * TWO_PI + tertiaryNoise * PI * 0.6;
    let flowMagnitude = (secondaryNoise - 0.5) * 0.1 * this.personalityFactor;
    
    // Enhanced orbital movement around center
    let orbitalForce = this.calculateOrbitalForce();
    
    this.acc = createVector(
      cos(flowAngle) * flowMagnitude + orbitalForce.x,
      sin(flowAngle) * flowMagnitude + orbitalForce.y
    );
    
    // Minimal center attraction only at extreme edges
    let center = createVector(width/2, height/2);
    let distanceFromCenter = p5.Vector.dist(this.pos, center);
    let maxRadius = min(width, height) * 0.48;
    
    if (distanceFromCenter > maxRadius) {
      let attraction = p5.Vector.sub(center, this.pos);
      let attractionStrength = 0.00001; // Extremely weak
      attraction.mult(attractionStrength);
      this.acc.add(attraction);
    }
    
    // Enhanced particle-to-particle interactions
    this.calculateParticleInteractions();
    
    // Apply forces
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed * this.energyBoost);
    this.pos.add(this.vel);
    
    // Dynamic boundary system with energy response
    this.maintainBoundaries();
    
    // Update all animation properties
    this.updateAnimationStates();
  }
  
  calculateOrbitalForce() {
    let centerX = width / 2;
    let centerY = height / 2;
    let angle = atan2(this.pos.y - centerY, this.pos.x - centerX);
    
    // Very weak, irregular orbital drift with noise variation
    let orbitalSpeed = 0.003 * this.personalityFactor;
    let orbitalAngle = angle + PI/2 + noise(this.noiseOffsetX * 0.1) * PI * 0.5; // Add noise to break circular motion
    
    return createVector(
      cos(orbitalAngle) * orbitalSpeed,
      sin(orbitalAngle) * orbitalSpeed
    );
  }
  
  calculateParticleInteractions() {
    // Balanced separation with minimal cohesion for connection
    let separation = createVector(0, 0);
    let cohesion = createVector(0, 0);
    let count = 0;
    
    for (let other of particles) {
      if (other !== this) {
        let distance = p5.Vector.dist(this.pos, other.pos);
        if (distance < 90) {
          // Strong separation when too close
          if (distance < 50) {
            let diff = p5.Vector.sub(this.pos, other.pos);
            diff.normalize();
            let separationStrength = map(distance, 0, 50, 1.5, 0.1);
            diff.mult(separationStrength);
            separation.add(diff);
          }
          
          // Very weak cohesion to maintain some connection
          cohesion.add(other.pos);
          count++;
        }
      }
    }
    
    if (count > 0) {
      // Moderate separation
      separation.mult(0.15 * this.personalityFactor);
      this.acc.add(separation);
      
      // Minimal cohesion for gentle connection
      cohesion.div(count);
      cohesion.sub(this.pos);
      cohesion.mult(0.0008); // Very weak
      this.acc.add(cohesion);
    }
  }
  
  maintainBoundaries() {
    let centerX = width / 2;
    let centerY = height / 2;
    let maxRadius = min(width, height) * 0.49;  // Almost to the edge of circle
    let distance = dist(this.pos.x, this.pos.y, centerX, centerY);
    
    if (distance > maxRadius) {
      let angle = atan2(this.pos.y - centerY, this.pos.x - centerX);
      this.pos.x = centerX + cos(angle) * maxRadius * 0.99;
      this.pos.y = centerY + sin(angle) * maxRadius * 0.99;
      this.vel.mult(0.8);  // Even gentler for ethereal feel
    }
  }
  
  updateAnimationStates() {
    this.noiseOffsetX += 0.008 * this.personalityFactor;
    this.noiseOffsetY += 0.007 * this.personalityFactor;
    this.pulseOffset += 0.015 * this.personalityFactor;
    this.colorCycle += 0.012;
    this.angle += this.rotationSpeed * this.energyBoost;
  }
  
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    
    // Dynamic color morphing with energy response
    let colorMix = sin(this.colorCycle + globalEnergy * PI) * 0.4 + 0.5;
    let energyInfluence = this.energyBoost * globalEnergy;
    
    let r = lerp(this.color[0], this.secondaryColor[0], colorMix);
    let g = lerp(this.color[1], this.secondaryColor[1], colorMix);
    let b = lerp(this.color[2], this.secondaryColor[2], colorMix);
    let alpha = lerp(this.color[3], this.secondaryColor[3], colorMix) * energyInfluence;
    
    // Ethereal multi-layer rendering with dreamy glow
    let glowRadius = this.size * (2.2 + energyInfluence * 0.8);
    
    // Dreamy outer aura with color shifting
    for (let i = 6; i >= 1; i--) {
      let glowAlpha = alpha * (0.06 / i) * energyInfluence;
      let glowSize = glowRadius * (0.5 + i * 0.25);
      let etherealShift = sin(this.colorCycle * 0.5 + breathingOffset + i * 0.3) * 8;
      fill(r + 25 + etherealShift, g + 35 + etherealShift * 0.7, b + 45 + etherealShift * 0.5, glowAlpha);
      noStroke();
      ellipse(0, 0, glowSize);
    }
    
    // Main particle body with sophisticated geometry
    fill(r, g, b, alpha);
    noStroke();
    
    if (this.size > 12) {
      // Large particles: complex organic shapes
      beginShape();
      let vertices = 12;
      let baseRadius = this.size * 0.45;
      
      for (let i = 0; i < vertices; i++) {
        let angle = (i / vertices) * TWO_PI;
        let variation1 = noise(angle * 3 + this.colorCycle * 0.8 + noiseOffset) * 3;
        let variation2 = sin(angle * 4 + this.pulseOffset) * 1.5 * energyInfluence;
        let radius = baseRadius + variation1 + variation2;
        
        let x = cos(angle) * radius;
        let y = sin(angle) * radius;
        vertex(x, y);
      }
      endShape(CLOSE);
      
      // Inner highlight
      fill(r + 40, g + 30, b + 20, alpha * 0.6);
      ellipse(this.size * 0.15, -this.size * 0.1, this.size * 0.3);
      
    } else if (this.size > 8) {
      // Medium particles: subtle variations
      beginShape();
      let vertices = 8;
      let baseRadius = this.size * 0.4;
      
      for (let i = 0; i < vertices; i++) {
        let angle = (i / vertices) * TWO_PI;
        let variation = noise(angle * 2 + this.colorCycle + noiseOffset) * 2;
        let radius = baseRadius + variation;
        
        let x = cos(angle) * radius;
        let y = sin(angle) * radius;
        vertex(x, y);
      }
      endShape(CLOSE);
      
    } else {
      // Small particles: clean circles with energy pulse
      let pulseSize = this.size * (1 + sin(this.pulseOffset * 2) * 0.2 * energyInfluence);
      ellipse(0, 0, pulseSize);
    }
    
    // Ethereal core highlights with dreamy sparkles
    if (energyInfluence > 1.1) {
      // Main ethereal highlight
      fill(255, 255, 255, 80 * (energyInfluence - 1));
      ellipse(0, 0, this.size * 0.5);
      
      // Dreamy sparkle effect
      fill(255, 255, 255, 120 * (energyInfluence - 1) * sin(this.pulseOffset * 3));
      ellipse(this.size * 0.2, -this.size * 0.15, this.size * 0.15);
      ellipse(-this.size * 0.15, this.size * 0.2, this.size * 0.1);
    }
    
    // Soft ethereal edge glow
    fill(255, 255, 255, 20 * energyInfluence * sin(breathingOffset + this.pulseOffset));
    ellipse(0, 0, this.size * 1.5);
    
    pop();
  }
  
  connect(particles) {
    for (let other of particles) {
      let distance = p5.Vector.dist(this.pos, other.pos);
      let maxConnectionDistance = 140 + globalEnergy * 50; // Wider ethereal connections
      
      if (distance < maxConnectionDistance && distance > 0) {
        // Sophisticated connection strength calculation
        let baseAlpha = map(distance, 0, maxConnectionDistance, 80, 0);
        let connectionStrength = (this.connectionStrength + other.connectionStrength) / 2;
        let energyMultiplier = 0.7 + globalEnergy * 0.8;
        let alpha = baseAlpha * connectionStrength * energyMultiplier;
        
        // Dynamic connection color based on particle colors
        let connectionR = lerp(this.color[0], other.color[0], 0.5);
        let connectionG = lerp(this.color[1], other.color[1], 0.5);
        let connectionB = lerp(this.color[2], other.color[2], 0.5);
        
        // Perfect balance - subtle but visible
        let strokeW = map(distance, 0, maxConnectionDistance, 2, 0.5) * energyMultiplier;
        
        // Ethereal curved connections with flowing motion
        let midX = (this.pos.x + other.pos.x) / 2;
        let midY = (this.pos.y + other.pos.y) / 2;
        
        let curvature1 = sin(noiseOffset * 1.2 + distance * 0.06) * 6;
        let curvature2 = cos(noiseOffset * 0.9 + distance * 0.08) * 4;
        let flow = sin(breathingOffset * 0.6 + distance * 0.05) * 2;
        
        // Prominent main connection line
        stroke(connectionR, connectionG, connectionB, alpha * 1.2);
        strokeWeight(strokeW);
        
        noFill();
        beginShape();
        curveVertex(this.pos.x, this.pos.y);
        curveVertex(this.pos.x, this.pos.y);
        curveVertex(midX + curvature1 + flow, midY + curvature2 - flow);
        curveVertex(other.pos.x, other.pos.y);
        curveVertex(other.pos.x, other.pos.y);
        endShape();
        
        // Ethereal outer glow with subtle color shifting
        let glowShift = sin(breathingOffset * 0.4 + distance * 0.03) * 5;
        stroke(connectionR + 25 + glowShift, connectionG + 25 + glowShift * 0.8, connectionB + 30 + glowShift * 0.6, alpha * 0.12);
        strokeWeight(strokeW * 1.3);
        
        beginShape();
        curveVertex(this.pos.x, this.pos.y);
        curveVertex(this.pos.x, this.pos.y);
        curveVertex(midX + curvature1 + flow, midY + curvature2 - flow);
        curveVertex(other.pos.x, other.pos.y);
        curveVertex(other.pos.x, other.pos.y);
        endShape();
        
        // Special high-energy connections
        if (globalEnergy > 0.7 && distance < 60) {
          stroke(255, 255, 255, 40 * globalEnergy);
          strokeWeight(1);
          line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        }
      }
    }
  }
}


function windowResized() {
  let container = document.querySelector('.hero-graphic');
  if (container) {
    let rect = container.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      resizeCanvas(rect.width, rect.height);
      // Re-initialize particles for new dimensions
      initializeParticles();
    }
  }
}

