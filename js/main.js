/* ============================================
   MAIN - Script principal
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize navigation
  initNavigation();
  
  // Add loaded class to body
  document.body.classList.add('loaded');
});

/* ============================================
   SCROLL ANIMATIONS
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
        const siblings = entry.target.parentElement.children;
        Array.from(siblings).forEach((sibling, index) => {
          if (sibling === entry.target) {
            entry.target.style.transitionDelay = `${index * 100}ms`;
          }
        });
      }
    });
  }, observerOptions);

  // Observe all elements that should animate
  const animateElements = document.querySelectorAll(
    '.timeline-item, .reasons-card, .animate-on-scroll'
  );
  
  animateElements.forEach(el => {
    observer.observe(el);
  });
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
  // Update active states based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Update nav dots
  document.querySelectorAll('.nav-dot').forEach(dot => {
    const href = dot.getAttribute('href');
    if (href === currentPage) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  // Update page indicators
  document.querySelectorAll('.page-nav-indicator').forEach(indicator => {
    const href = indicator.getAttribute('href');
    if (href === currentPage) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });

  // Smooth page transitions
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only for internal links
      if (href && !href.startsWith('http') && !href.startsWith('#')) {
        e.preventDefault();
        
        // Add fade out animation
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });

  // Fade in on page load
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function
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

// Throttle function
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
