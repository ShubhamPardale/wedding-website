// RSVP Form Handling - submits to Formspree
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvp-form');
  const formContainer = document.getElementById('rsvp-form-container');
  const successMessage = document.getElementById('rsvp-success');
  const submitButton = form.querySelector('.rsvp-button');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    const formData = new FormData(form);
    formData.append('_subject', 'Wedding RSVP');

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
});
