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

  const sparkleContainer = document.querySelector('.sparkle-container');
  const sparkleCount = 100; // number of sparkles
  
  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
  
    // random position
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
  
    // random size
    const size = Math.random() * 3 + 2; // 2px to 5px
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
  
    // random animation duration and delay
    const duration = Math.random() * 3 + 2; // 2s to 5s
    const delay = Math.random() * 5;       // 0s to 5s
    sparkle.style.animationDuration = `${duration}s`;
    sparkle.style.animationDelay = `${delay}s`;
  
    sparkleContainer.appendChild(sparkle);
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
