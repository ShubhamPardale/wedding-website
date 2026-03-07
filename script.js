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

  const canvas = document.getElementById('effectsCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Petals
const petals = [];
const petalCount = 25; // fewer petals for elegance
for (let i = 0; i < petalCount; i++) {
  petals.push({
    x: Math.random() * width,
    y: Math.random() * height,
    size: 12 + Math.random() * 12,
    speedY: 1 + Math.random() * 2,
    speedX: -0.5 + Math.random() * 1,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 2
  });
}

  // Sparkles
  const sparkles = [];
  const sparkleCount = 150; // more sparkles
  for (let i = 0; i < sparkleCount; i++) {
    sparkles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 2 + Math.random() * 3,
      alpha: 0.6 + Math.random() * 0.4,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3
    });
  }
  
  // Petal color palette (soft wedding colors)
  const petalColors = ['#f9c6c9', '#f5d6a1', '#fff5f0'];
  
  // Draw loop
  function draw() {
    ctx.clearRect(0, 0, width, height);
  
    // Draw petals
    for (let p of petals) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = petalColors[Math.floor(Math.random() * petalColors.length)];
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
  
      // Move petals
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;
  
      // Wrap around edges
      if (p.y > height + 20) p.y = -20;
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;
    }
  
    // Draw sparkles
    for (let s of sparkles) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.fill();
  
      // Flicker effect
      s.alpha = 0.5 + Math.random() * 0.5;
  
      // Move sparkles
      s.x += s.dx;
      s.y += s.dy;
  
      // Wrap edges
      if (s.x < 0) s.x = width;
      if (s.x > width) s.x = 0;
      if (s.y < 0) s.y = height;
      if (s.y > height) s.y = 0;
    }
  
    requestAnimationFrame(draw);
  }
  
  draw();
  
  // Resize handling
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
   
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
