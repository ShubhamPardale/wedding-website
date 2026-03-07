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


  document.addEventListener("DOMContentLoaded", function() {
  const container = document.querySelector(".sparkle-container");
  const isMobile = window.innerWidth <= 768;
  const count = isMobile ? 50 : 150; // fewer sparkles on mobile

  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.classList.add("sparkle");

    // Random initial position
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";

    // Random animation duration and delay
    s.style.animationDuration = 2 + Math.random() * 3 + "s";
    s.style.animationDelay = Math.random() * 5 + "s";

    container.appendChild(s);
    }
  });
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
