// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // RSVP Form - Formspree
  const form = document.getElementById('rsvp-form');
  const formContainer = document.getElementById('rsvp-form-container');
  const successMessage = document.getElementById('rsvp-success');
  const submitButton = form?.querySelector('.rsvp-button');

  const canvas = document.getElementById("sparkleCanvas");
  const ctx = canvas.getContext("2d");
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  
  // Generate sparkles
  const sparkles = [];
  const sparkleCount = window.innerWidth <= 768 ? 50 : 150; // fewer for mobile
  
  for (let i = 0; i < sparkleCount; i++) {
    sparkles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random(),
      opacityChange: Math.random() * 0.02 + 0.01
    });
  }
  
  function animateSparkles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparkles.forEach(s => {
      s.opacity += s.opacityChange;
      if (s.opacity > 1 || s.opacity < 0) s.opacityChange *= -1;
      ctx.fillStyle = `rgba(255, 250, 205, ${s.opacity})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animateSparkles);
  }
  
  animateSparkles();
  
  if (form && formContainer && successMessage && submitButton) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';

      const formData = new FormData(form);
      formData.append('_subject', 'Aditya & Apurva Wedding RSVP');

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        });

        if (response.ok) {
          formContainer.classList.add('hidden');
          successMessage.classList.remove('hidden');
          successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          const data = await response.json();
          throw new Error(data.error || 'Something went wrong');
        }
      } catch (err) {
        alert('Sorry, there was an error. Please try again or email us directly.');
        submitButton.disabled = false;
        submitButton.textContent = 'Send RSVP';
      }
    });
  }
});
