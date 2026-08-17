/* ============================================
   LIQUID MESH - Canvas mesh gradient animation
   ============================================ */

class LiquidMesh {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.width = 0;
    this.height = 0;
    this.time = 0;
    this.blobs = [];
    this.mouse = { x: 0, y: 0 };
    
    this.init();
  }
  
  init() {
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.opacity = '0.6';
    
    // Insert before particles
    const liquidWaves = document.querySelector('.liquid-waves');
    if (liquidWaves) {
      liquidWaves.insertBefore(this.canvas, liquidWaves.firstChild);
    }
    
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    
    // Create blobs
    this.createBlobs();
    
    // Event listeners
    window.addEventListener('resize', () => this.resize());
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    
    // Start animation
    this.animate();
  }
  
  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * 0.5; // Reduced for performance
    this.canvas.height = this.height * 0.5;
    this.ctx.scale(0.5, 0.5);
  }
  
  createBlobs() {
    const colors = [
      { r: 125, g: 211, b: 252 }, // Celeste
      { r: 26, g: 39, b: 68 },    // Azul marino
      { r: 240, g: 194, b: 127 }, // Dorado
      { r: 186, g: 230, b: 253 }, // Celeste claro
    ];
    
    for (let i = 0; i < 4; i++) {
      this.blobs.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: 150 + Math.random() * 100,
        color: colors[i],
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        phase: Math.random() * Math.PI * 2
      });
    }
  }
  
  drawBlob(blob) {
    const gradient = this.ctx.createRadialGradient(
      blob.x, blob.y, 0,
      blob.x, blob.y, blob.radius
    );
    
    gradient.addColorStop(0, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0.15)`);
    gradient.addColorStop(0.5, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0.05)`);
    gradient.addColorStop(1, 'transparent');
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  updateBlobs() {
    this.blobs.forEach(blob => {
      // Organic movement
      blob.x += Math.sin(this.time * 0.001 + blob.phase) * blob.speedX;
      blob.y += Math.cos(this.time * 0.001 + blob.phase) * blob.speedY;
      
      // Subtle mouse interaction
      const dx = this.mouse.x - blob.x;
      const dy = this.mouse.y - blob.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 300) {
        const force = (300 - dist) / 300 * 0.02;
        blob.x -= dx * force;
        blob.y -= dy * force;
      }
      
      // Boundary wrapping
      if (blob.x < -blob.radius) blob.x = this.width + blob.radius;
      if (blob.x > this.width + blob.radius) blob.x = -blob.radius;
      if (blob.y < -blob.radius) blob.y = this.height + blob.radius;
      if (blob.y > this.height + blob.radius) blob.y = -blob.radius;
    });
  }
  
  animate() {
    // Clear with fade effect
    this.ctx.fillStyle = 'rgba(10, 22, 40, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Update and draw blobs
    this.updateBlobs();
    this.blobs.forEach(blob => this.drawBlob(blob));
    
    this.time++;
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  // Only on index page
  if (window.location.pathname.includes('index.html') || 
      window.location.pathname.endsWith('/')) {
    new LiquidMesh();
  }
});
