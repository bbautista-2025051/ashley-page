/* ============================================
   WORD RAIN - Canvas animation for falling words
   ============================================ */

class WordRain {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.words = [];
    this.width = 0;
    this.height = 0;
    
    this.wordList = [
      'amor', 'Ashley', 'cariño', 'mi nena', 'mi princesa',
      'bonita', 'hermosa', 'especial', 'corazón', 'te quiero',
      'sonrisa', 'belleza', 'ilusión', 'abrazo', 'beso',
      'eternidad', 'futuro', 'juntos', 'sueño', 'destino',
      'amar', 'querer', 'extrañar', 'pensar', 'sentir',
      'contigo', 'siempre', 'nunca', 'tuyo', 'mío',
      'latido', 'alma', 'vida', 'luz', 'estrella'
    ];
    
    this.init();
  }
  
  init() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'word-rain-canvas';
    
    const container = document.querySelector('.word-rain-bg');
    if (container) {
      container.insertBefore(this.canvas, container.firstChild);
    }
    
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.createWords();
    
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }
  
  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
  
  createWords() {
    const count = 25;
    
    for (let i = 0; i < count; i++) {
      this.words.push({
        text: this.wordList[Math.floor(Math.random() * this.wordList.length)],
        x: Math.random() * this.width,
        y: Math.random() * this.height - this.height,
        speed: 0.3 + Math.random() * 0.5,
        opacity: 0.05 + Math.random() * 0.1,
        size: 12 + Math.random() * 16,
        rotation: (Math.random() - 0.5) * 0.1,
        color: this.getRandomColor()
      });
    }
  }
  
  getRandomColor() {
    const colors = [
      'rgba(125, 211, 252,',   // Celeste
      'rgba(240, 194, 127,',   // Dorado
      'rgba(186, 230, 253,',   // Celeste claro
      'rgba(248, 250, 252,'    // Blanco
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  drawWord(word) {
    this.ctx.save();
    this.ctx.translate(word.x, word.y);
    this.ctx.rotate(word.rotation);
    this.ctx.font = `italic ${word.size}px 'Playfair Display', serif`;
    this.ctx.fillStyle = `${word.color} ${word.opacity})`;
    this.ctx.textAlign = 'center';
    this.ctx.fillText(word.text, 0, 0);
    this.ctx.restore();
  }
  
  update() {
    this.words.forEach(word => {
      word.y += word.speed;
      
      // Reset when off screen
      if (word.y > this.height + 50) {
        word.y = -50;
        word.x = Math.random() * this.width;
        word.text = this.wordList[Math.floor(Math.random() * this.wordList.length)];
        word.opacity = 0.05 + Math.random() * 0.1;
      }
    });
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.update();
    this.words.forEach(word => this.drawWord(word));
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.word-rain-bg')) {
    new WordRain();
  }
});
