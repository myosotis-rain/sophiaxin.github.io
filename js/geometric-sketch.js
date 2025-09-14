// Thoughtful Portfolio Background - Organic Minimalism
let geometricSketch = function(p) {
    let elements = [];
    let time = 0;
    let canvasWidth, canvasHeight;
    
    // More visible but still elegant palette
    const palette = {
        whisper: [179, 167, 207, 25],   // Primary - more visible
        breath: [200, 190, 218, 35],    // Soft secondary 
        mist: [246, 244, 252, 40],      // Gentle highlight
        shadow: [163, 161, 176, 20]     // Subtle depth
    };
    
    p.setup = function() {
        console.log("Thoughtful sketch starting...");
        const container = document.getElementById('geometric-canvas');
        if (!container) {
            console.error("Container not found!");
            return;
        }
        
        canvasWidth = container.offsetWidth || 450;
        canvasHeight = container.offsetHeight || 450;
        console.log("Canvas size:", canvasWidth, "x", canvasHeight);
        
        let canvas = p.createCanvas(canvasWidth, canvasHeight);
        canvas.parent('geometric-canvas');
        console.log("Canvas created and attached");
        
        createThoughtfulComposition();
        console.log("Elements created:", elements.length);
        
        window.addEventListener('resize', () => {
            const newContainer = document.getElementById('geometric-canvas');
            if (newContainer) {
                canvasWidth = newContainer.offsetWidth;
                canvasHeight = newContainer.offsetHeight;
                p.resizeCanvas(canvasWidth, canvasHeight);
                createThoughtfulComposition();
            }
        });
    };
    
    function createThoughtfulComposition() {
        elements = [];
        
        // Organic placement - feels natural, not calculated
        const naturalPoints = [
            { x: canvasWidth * 0.25, y: canvasHeight * 0.35, type: 'large' },
            { x: canvasWidth * 0.70, y: canvasHeight * 0.25, type: 'medium' },
            { x: canvasWidth * 0.15, y: canvasHeight * 0.75, type: 'small' },
            { x: canvasWidth * 0.80, y: canvasHeight * 0.65, type: 'medium' },
            { x: canvasWidth * 0.45, y: canvasHeight * 0.80, type: 'tiny' }
        ];
        
        naturalPoints.forEach((point, i) => {
            let baseSize, color, intensity;
            
            switch(point.type) {
                case 'large':
                    baseSize = canvasWidth * 0.15;
                    color = palette.whisper;
                    intensity = 1.0;
                    break;
                case 'medium':
                    baseSize = canvasWidth * 0.08;
                    color = palette.breath;
                    intensity = 0.7;
                    break;
                case 'small':
                    baseSize = canvasWidth * 0.06;
                    color = palette.mist;
                    intensity = 0.5;
                    break;
                case 'tiny':
                    baseSize = canvasWidth * 0.03;
                    color = palette.shadow;
                    intensity = 0.3;
                    break;
            }
            
            elements.push({
                x: point.x,
                y: point.y,
                baseX: point.x,
                baseY: point.y,
                size: baseSize,
                baseSize: baseSize,
                color: color,
                phase: i * (p.PI / 3),
                speed: 0.001 + (i * 0.0003),
                breathAmplitude: baseSize * 0.08,
                driftAmplitude: canvasWidth * 0.015,
                intensity: intensity,
                type: point.type
            });
        });
    }
    
    p.draw = function() {
        p.clear();
        time += 0.008; // Slower, more contemplative
        
        // Temporary test circle to verify canvas is working
        p.fill(255, 0, 0, 50);
        p.noStroke();
        p.ellipse(50, 50, 30, 30);
        
        elements.forEach(element => {
            updateElement(element);
            drawElement(element);
        });
    };
    
    function updateElement(element) {
        // Very gentle breathing - like meditation
        const breathe = p.sin(time * element.speed + element.phase);
        const drift = p.cos(time * element.speed * 0.7 + element.phase * 1.3);
        
        // Subtle size breathing
        element.size = element.baseSize + (breathe * element.breathAmplitude);
        
        // Gentle positional drift - like clouds
        element.x = element.baseX + (drift * element.driftAmplitude);
        element.y = element.baseY + (breathe * element.driftAmplitude * 0.6);
        
        // Very subtle mouse response - like being aware of presence
        if (p.mouseX > 0 && p.mouseX < canvasWidth && p.mouseY > 0 && p.mouseY < canvasHeight) {
            const mouseDistance = p.dist(p.mouseX, p.mouseY, element.baseX, element.baseY);
            const influenceRadius = canvasWidth * 0.25;
            
            if (mouseDistance < influenceRadius) {
                const influence = p.map(mouseDistance, 0, influenceRadius, 1, 0);
                influence = p.pow(influence, 2); // Softer falloff
                
                // Gentle attraction, not strong pull
                const attraction = p.createVector(p.mouseX - element.x, p.mouseY - element.y);
                attraction.mult(0.001 * influence);
                
                element.x += attraction.x;
                element.y += attraction.y;
                
                // Slight size response to presence
                element.size += (influence * element.baseSize * 0.1);
            }
        }
    }
    
    function drawElement(element) {
        p.push();
        p.translate(element.x, element.y);
        
        // Multiple layers for depth and softness
        const layers = [
            { scale: 1.0, opacity: element.color[3] },
            { scale: 0.7, opacity: element.color[3] * 0.6 },
            { scale: 0.4, opacity: element.color[3] * 0.3 }
        ];
        
        layers.forEach(layer => {
            p.fill(element.color[0], element.color[1], element.color[2], layer.opacity);
            p.noStroke();
            
            const layerSize = element.size * layer.scale;
            p.ellipse(0, 0, layerSize, layerSize);
        });
        
        // Subtle inner glow for the larger elements
        if (element.type === 'large' || element.type === 'medium') {
            p.fill(255, 255, 255, element.color[3] * 0.15);
            p.ellipse(0, 0, element.size * 0.3, element.size * 0.3);
        }
        
        p.pop();
    }
};

// Initialize the thoughtful sketch
new p5(geometricSketch);