/* ============================================
   PARTICLES CONFIG - Configuración de partículas celeste
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    // Check if on index page (has liquid waves)
    const isIndexPage = window.location.pathname.includes('index.html') || 
                        window.location.pathname.endsWith('/ashley-page/') ||
                        window.location.pathname.endsWith('/');
    
    // Reduce particles on index page since we have liquid waves
    const particleCount = isIndexPage ? 40 : 80;
    const particleOpacity = isIndexPage ? 0.3 : 0.4;
    const linkOpacity = isIndexPage ? 0.1 : 0.15;
    
    particlesJS('particles-js', {
      particles: {
        number: {
          value: particleCount,
          density: {
            enable: true,
            value_area: 1200
          }
        },
        color: {
          value: ['#7dd3fc', '#bae6fd', '#f0c27f']
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          },
          polygon: {
            nb_sides: 5
          }
        },
        opacity: {
          value: particleOpacity,
          random: true,
          anim: {
            enable: true,
            speed: 0.3,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 2,
          random: true,
          anim: {
            enable: true,
            speed: 0.8,
            size_min: 0.3,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 120,
          color: '#7dd3fc',
          opacity: linkOpacity,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.2
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 0.8,
            line_linked: {
              opacity: 0.5
            }
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 2
          },
          remove: {
            particles_nb: 1
          }
        }
      },
      retina_detect: true
    });
  }
});
