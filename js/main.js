// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Wait for DOM
document.addEventListener("DOMContentLoaded", (event) => {
  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);

  // Navbar blur on scroll
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('py-2');
        navbar.classList.remove('py-6');
      } else {
        navbar.classList.add('py-6');
        navbar.classList.remove('py-2');
      }
    });
  }

  // Hero Animations
  const heroContent = document.getElementById('hero-content');
  if (heroContent) {
    gsap.fromTo(heroContent.children, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
    );
  }

  // Glass panel stagger
  const panels = gsap.utils.toArray('.glass-panel');
  if (panels.length > 0) {
    panels.forEach((panel, i) => {
      gsap.fromTo(panel, 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: panel,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: i * 0.1
        }
      );
    });
  }
});
