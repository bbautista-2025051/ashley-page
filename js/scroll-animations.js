/* ============================================
   SCROLL ANIMATIONS - Animaciones al hacer scroll
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  initParallaxEffects();
  initCounterAnimations();
});

/* ============================================
   SCROLL REVEAL
   ============================================ */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Add stagger delay for grid items
        const parent = entry.target.parentElement;
        if (parent && parent.classList.contains('reasons-grid')) {
          const siblings = Array.from(parent.children);
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 100}ms`;
        }
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  const animatableElements = document.querySelectorAll(
    '.reasons-card, .timeline-item, .animate-on-scroll, .fade-in, .slide-up'
  );
  
  animatableElements.forEach(el => {
    // Set initial state
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    observer.observe(el);
  });
}

/* ============================================
   PARALLAX EFFECTS
   ============================================ */
function initParallaxEffects() {
  const decorations = document.querySelectorAll(
    '.hero-decoration, .final-decoration'
  );
  
  if (decorations.length > 0) {
    window.addEventListener('scroll', throttle(() => {
      const scrollY = window.scrollY;
      
      decorations.forEach((decoration, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrollY * speed);
        decoration.style.transform = `translateY(${yPos}px)`;
      });
    }, 16));
  }
}

/* ============================================
   COUNTER ANIMATIONS
   ============================================ */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.reasons-counter-text span');
  
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
  }
}

function animateCounter(element) {
  const target = parseInt(element.textContent);
  const duration = 1500;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

/* ============================================
   SMOOTH SCROLL PROGRESS
   ============================================ */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  
  if (progressBar) {
    window.addEventListener('scroll', throttle(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }, 16));
  }
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
