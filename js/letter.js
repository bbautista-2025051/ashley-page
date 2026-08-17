/* ============================================
   LETTER - Efecto de escritura para la carta
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  const letterText = document.getElementById('letter-text');
  const typingCursor = document.getElementById('typing-cursor');
  
  if (letterText && typingCursor) {
    initTypingEffect(letterText, typingCursor);
  }
});

function initTypingEffect(container, cursor) {
  // Get all paragraphs
  const paragraphs = container.querySelectorAll('p');
  
  // Initially hide all paragraphs
  paragraphs.forEach(p => {
    p.style.opacity = '0';
    p.style.transform = 'translateY(10px)';
    p.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Show paragraphs one by one with delay
  let delay = 500; // Initial delay
  
  paragraphs.forEach((paragraph, index) => {
    setTimeout(() => {
      paragraph.style.opacity = '1';
      paragraph.style.transform = 'translateY(0)';
      
      // Add typing effect for personalizable text
      const personalizable = paragraph.querySelector('.personalizable');
      if (personalizable) {
        typeText(personalizable, 30);
      }
    }, delay);
    
    delay += 800; // Delay between paragraphs
  });

  // Position cursor at the end
  setTimeout(() => {
    container.appendChild(cursor);
    cursor.style.display = 'inline-block';
  }, delay);
}

function typeText(element, speed = 50) {
  const text = element.textContent;
  element.textContent = '';
  element.style.display = 'inline';
  
  let i = 0;
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

/* ============================================
   LETTER - Scroll reveal effect
   ============================================ */
function initLetterScrollReveal() {
  const letterBody = document.querySelector('.letter-body');
  
  if (letterBody) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(letterBody);
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initLetterScrollReveal);
