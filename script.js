document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '10px 5%';
      header.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
      header.style.padding = '20px 5%';
      header.style.background = 'rgba(10, 10, 10, 0.8)';
    }
  });

  // Scroll Reveal Animations
  const reveals = document.querySelectorAll('.reveal');
  
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
  });

  // Portfolio Carousel Logic
  const carousel = document.getElementById('portfolioCarousel');
  const btnPrev = document.querySelector('.carousel-btn.prev');
  const btnNext = document.querySelector('.carousel-btn.next');

  if (carousel && btnPrev && btnNext) {
    btnNext.addEventListener('click', () => {
      const itemWidth = carousel.querySelector('.portfolio-item').offsetWidth;
      // Check if we've reached the end
      if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: itemWidth + 30, behavior: 'smooth' }); // 30 is the gap
      }
    });

    btnPrev.addEventListener('click', () => {
      const itemWidth = carousel.querySelector('.portfolio-item').offsetWidth;
      // Check if we're at the beginning
      if (carousel.scrollLeft <= 0) {
        carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: -(itemWidth + 30), behavior: 'smooth' });
      }
    });
  }

  // Contact Form Mock Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Change button state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = 'Sending...';
      submitBtn.style.opacity = '0.7';
      submitBtn.disabled = true;

      // Mock network request
      setTimeout(() => {
        submitBtn.innerText = 'Message Sent!';
        submitBtn.style.background = 'var(--color-text-main)';
        submitBtn.style.color = 'var(--color-bg-dark)';
        submitBtn.style.opacity = '1';
        
        // Reset form after a delay
        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerText = originalText;
          submitBtn.style.background = 'var(--grad-gold)';
          submitBtn.style.color = 'var(--color-bg-dark)';
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
});
