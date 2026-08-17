/* ============================================
   TIMELINE - Animaciones de línea de tiempo
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  if (timelineItems.length > 0) {
    initTimelineAnimations(timelineItems);
  }
});

function initTimelineAnimations(items) {
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add delay for stagger effect
        setTimeout(() => {
          entry.target.classList.add('visible');
          
          // Animate the dot
          const dot = entry.target.querySelector('.timeline-item-dot');
          if (dot) {
            dot.style.transform = 'scale(1.3)';
            dot.style.boxShadow = '0 0 0 8px rgba(125, 211, 252, 0.3), 0 0 20px rgba(125, 211, 252, 0.5)';
            
            setTimeout(() => {
              dot.style.transform = 'scale(1)';
              dot.style.boxShadow = '0 0 0 4px rgba(125, 211, 252, 0.2)';
            }, 300);
          }
          
          // Animate the card
          const card = entry.target.querySelector('.timeline-card');
          if (card) {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
          }
        }, index * 150); // Stagger delay
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px 0px 50px 0px'
  });

  // Observe all timeline items
  items.forEach(item => {
    // Set initial state
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    observer.observe(item);
  });
  
  // Fallback: make items visible after a delay if observer doesn't trigger
  setTimeout(() => {
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        
        const card = item.querySelector('.timeline-card');
        if (card) {
          card.style.transform = 'translateY(0)';
          card.style.opacity = '1';
        }
      }, index * 200);
    });
  }, 500);
}

/* ============================================
   TIMELINE - Line animation
   ============================================ */
function animateTimelineLine() {
  const line = document.querySelector('.timeline-container::before');
  
  if (line) {
    line.style.height = '0';
    line.style.transition = 'height 1.5s ease';
    
    setTimeout(() => {
      line.style.height = '100%';
    }, 300);
  }
}

// Initialize line animation on load
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(animateTimelineLine, 500);
});
