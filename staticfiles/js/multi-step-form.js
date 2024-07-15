document.addEventListener('DOMContentLoaded', function () {
  const modalContainer = document.querySelector('.modal-container');
  const modal = modalContainer.querySelector('.modal');

  modalContainer.addEventListener('click', e => {
    if (!modal.contains(e.target)) {
      modalContainer.classList.remove('active');
    }
  });

  const initializeMultiStepForm = () => {
    const multiStepForm = document.getElementById('multi-step-form');
    const steps = Array.from(multiStepForm.querySelectorAll('.step'));

    const nextButtons = multiStepForm.querySelectorAll('.next-btn');
    const prevButtons = multiStepForm.querySelectorAll('.prev-btn');
    //   const points = document.querySelectorAll('.points');
    //   const indicators = document.querySelectorAll('.indicator .points i');

    let currentStep = 0;

    nextButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
          steps[currentStep].classList.add('hidden');
          // points[currentStep].classList.add('filled');
          // indicators[currentStep].classList.remove('ri-checkbox-circle-fill');
          // indicators[currentStep].classList.add('ri-checkbox-circle-line');
          currentStep++;
          steps[currentStep].classList.remove('hidden');
          // indicators[currentStep].classList.add('ri-checkbox-circle-fill');
          // indicators[currentStep].classList.remove('ri-checkbox-circle-line');
        }
      });
    });

    prevButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (currentStep > 0) {
          steps[currentStep].classList.add('hidden');
          // indicators[currentStep].classList.remove('ri-checkbox-circle-fill');
          // indicators[currentStep].classList.add('ri-checkbox-circle-line');
          currentStep--;
          steps[currentStep].classList.remove('hidden');
          // indicators[currentStep].classList.add('ri-checkbox-circle-fill');
          // indicators[currentStep].classList.remove('ri-checkbox-circle-line');
        }
      });
    });
  };

  // Event listener to initialize multi-step form when modal is shown
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'class') {
        if (modalContainer.classList.contains('active')) {
          initializeMultiStepForm();
        }
      }
    });
  });

  observer.observe(modalContainer, { attributes: true });
});
