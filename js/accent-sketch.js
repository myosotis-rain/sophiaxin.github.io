// 线状抽象山峦 - Linear Abstract Mountain Ridges
// Japanese-inspired ethereal line sketches with flowing rhythm

let terrainLines = [];
let numLines = 8;
let time = 0;
let breathingOffset = 0;

function setup() {
  let container = document.getElementById('accent-canvas');
  let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.parent('accent-canvas');
  
  // Initialize asymmetrical terrain lines like mountain ridges
  for (let i = 0; i < numLines; i++) {
    terrainLines.push(new TerrainLine(i));
  }
}

function draw() {
  clear(); // Pure transparency for background layering
  
  time += 0.004; // Slower, more meditative movement
  breathingOffset += 0.002;
  
  // Render from farthest to nearest for depth layering
  for (let i = terrainLines.length - 1; i >= 0; i--) {
    terrainLines[i].update();
    terrainLines[i].display();
  }
}

class TerrainLine {
  constructor(index) {
    this.index = index;
    this.depth = map(index, 0, numLines - 1, 0, 1); // Depth for layering
    this.baseY = random(height * 0.15, height * 0.85); // Asymmetrical positioning
    this.complexity = random(0.003, 0.015); // Terrain complexity
    this.roughness = random(0.8, 2.5); // Mountain roughness factor
    this.drift = random(-0.2, 0.2); // Subtle horizontal drift
    this.breathingPhase = random(TWO_PI); // Individual breathing rhythm
    this.elevation = random(-height * 0.1, height * 0.2); // Elevation variance
    
    // Japanese-inspired blue-purple palette with depth-based opacity
    this.colors = [
      { r: 179, g: 167, b: 207 }, // Soft lilac
      { r: 200, g: 190, b: 218 }, // Dusty mauve  
      { r: 163, g: 161, b: 176 }, // Warm gray
      { r: 190, g: 180, b: 210 }, // Light lavender
    ];
    
    this.colorIndex = floor(random(this.colors.length));
    
    // Depth-based properties for atmospheric perspective
    this.opacity = map(this.depth, 0, 1, 15, 60); // Distant lines more transparent
    this.weight = map(this.depth, 0, 1, 0.3, 1.2); // Distant lines thinner
    
    // Generate terrain points with non-repetitive patterns
    this.generateTerrain();
  }
  
  generateTerrain() {
    this.points = [];
    let step = width / 60; // Smooth line resolution
    
    for (let x = -step; x <= width + step; x += step) {
      // Multi-octave noise for terrain-like complexity
      let y = this.baseY;
      
      // Large-scale terrain shape (mountain silhouettes)
      y += noise(x * 0.002, this.index * 0.1, breathingOffset * 0.1) * height * 0.3;
      
      // Medium-scale terrain features (ridges and valleys)  
      y += noise(x * this.complexity, this.index * 0.3, time * 0.1) * this.elevation * this.roughness;
      
      // Fine-scale terrain detail (rocky texture)
      y += noise(x * this.complexity * 3, this.index * 0.5, time * 0.05) * this.elevation * 0.3;
      
      // Very fine detail (surface texture)
      y += noise(x * this.complexity * 8, this.index * 0.8, time * 0.02) * this.elevation * 0.1;
      
      this.points.push({ x: x, y: y });
    }
  }
  
  update() {
    // Gentle breathing motion - very subtle
    let breathingInfluence = sin(time * 0.3 + this.breathingPhase) * 3;
    
    // Update terrain with flowing, non-repetitive movement
    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i];
      let x = point.x;
      
      // Recalculate with slight time-based evolution
      let y = this.baseY;
      
      // Evolving terrain that never repeats exactly
      y += noise(x * 0.002 + this.drift * time, this.index * 0.1, breathingOffset * 0.1) * height * 0.3;
      y += noise(x * this.complexity + this.drift * time * 0.5, this.index * 0.3, time * 0.1) * this.elevation * this.roughness;
      y += noise(x * this.complexity * 3 + this.drift * time * 0.3, this.index * 0.5, time * 0.05) * this.elevation * 0.3;
      y += noise(x * this.complexity * 8 + this.drift * time * 0.1, this.index * 0.8, time * 0.02) * this.elevation * 0.1;
      
      // Add subtle breathing
      y += breathingInfluence;
      
      point.y = y;
    }
  }
  
  display() {
    let currentColor = this.colors[this.colorIndex];
    
    // Breathing opacity modulation
    let breathingAlpha = map(sin(time * 0.4 + this.breathingPhase), -1, 1, 0.6, 1);
    let finalOpacity = this.opacity * breathingAlpha;
    
    // Pure line art - no fills, only ethereal strokes
    stroke(currentColor.r, currentColor.g, currentColor.b, finalOpacity);
    strokeWeight(this.weight);
    noFill();
    
    // Draw terrain line with smooth curves
    beginShape();
    
    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i];
      
      if (i === 0 || i === this.points.length - 1) {
        vertex(point.x, point.y);
      } else {
        // Smooth mountain ridge curves
        vertex(point.x, point.y);
      }
    }
    
    endShape();
    
    // Optional: Add subtle highlight line for distant mountains
    if (this.depth < 0.3) {
      stroke(255, 255, 255, finalOpacity * 0.15);
      strokeWeight(this.weight * 0.3);
      
      beginShape();
      for (let i = 0; i < this.points.length; i++) {
        let point = this.points[i];
        vertex(point.x, point.y - 1);
      }
      endShape();
    }
  }
}

function windowResized() {
  let container = document.getElementById('accent-canvas');
  if (container) {
    resizeCanvas(container.offsetWidth, container.offsetHeight);
    
    // Gracefully regenerate terrain lines for new canvas size
    terrainLines = [];
    for (let i = 0; i < numLines; i++) {
      terrainLines.push(new TerrainLine(i));
    }
  }
}